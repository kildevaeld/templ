{
/*jshint laxcomma:false */

function trimWhitespace(ws) {
  return trimNewLineChars(ws).replace(/(^[\r\n]+)|([\r\n]+$)/, " ");
}

function trimEnds(ws) {
  return ws.replace(/(^\s+)|(\s+$)/, "").replace(/[\r\n]/g, "\\n");
}

function trimNewLineChars(ws) {
  return ws.replace(/[ \r\n\t]+/g, " ");
}

function trimmedText() {
  return trimWhitespace(text());
}

function attrValues(values) {

  values = values.filter(function(v) {
    return !/^[\n\t\r]+$/.test(v.value);
  });

  if (values.length === 1 && values[0].type === "string") {
    return values[0];
  } else {
    return values;
  }
}

function trimTextExpressions(expressions) {

  function _trim(exprs) {
    var expr;
    for (var i = exprs.length; i--;) {
      expr = exprs[i];
      if (expr.type == "textNode" && !/\S/.test(expr.value) && !expr.decoded) {
        exprs.splice(i, 1);
      } else {
        break;
      }
    }
    return exprs;
  }

  return _trim(_trim(expressions.reverse()).reverse());
}

function expression(name) {
  return Array.prototype.slice.call(arguments);
}

function escapeString(string) {
  return string.replace(/[\n\r]+/g,"\\n").replace(/'/g,"\\'");
}

}

Start
  = Template

Template
  = children:ChildNodes { return children; }

DocType
  = "<!DOCTYPE" _ info:[^>]+ _ ">" {
      return ["doctype", info.join("")];
    }

ChildNodes
  = children:(VoidElement/ScriptStart/ElementNode/CommentNode/TextNode/BlockBinding)* { return trimTextExpressions(children); }


CommentNode
  = _ "<!--" value:(!"-->" v:SourceCharacter { return v; })+ "-->" _ {
    return ["comment", escapeString(trimEnds(value.join("")))];
  }
  / DocType

ScriptStart
  = _ "<script" attributes:TagAttributes ">" content:ScriptEnd+ "</script>" _  {
      return ["element", "script", attributes, [["text", escapeString(content.join(""))]]];
    }

ScriptEnd
  = !("</script>") SourceCharacter {
      return text();
    }

VoidElement
  = "<" nodeName:("area"/"base"/"br"/"col"/"command"/"embed"/"hr"/"img"/"input"/"keygen"/"link"/"meta"/"param"/"source"/"track"/"wbr") attributes:TagAttributes (">"/"/>")? endTag:EndVoidTag? {

    if (endTag && nodeName != endTag.name) {
      expected("</" + nodeName + ">");
    }

    return ["element", nodeName, attributes, []];
  }


EndVoidTag
  = _ "</" name:("area"/"base"/"br"/"col"/"command"/"embed"/"hr"/"img"/"input"/"keygen"/"link"/"meta"/"param"/"source"/"track"/"wbr") ">" {
      return {
        name: name
      };
    }


ElementNode
  = startTag:StartTag children:ChildNodes endTag:EndTag {

    if (startTag.name != endTag.name) {
      expected("</" + startTag.name + ">");
    }

    return ["element", startTag.name, startTag.attributes, children];
  }
  / StartEndTag

TextNode
  = value:TextCharacter+ {
      return ["text", escapeString(trimNewLineChars(value.join("")))];
    }

TextCharacter
  = !("<"/"{{") SourceCharacter {
      return text();
    }

StartTag
  = _ "<" info:TagInfo ">" _ { return info; }

StartEndTag
  = _ "<" info:TagInfo "/>" _ { return ["element", info.name, info.attributes, []]; }

TagInfo
  = name:TagName attrs:TagAttributes {
      return {
        name: name,
        attributes: attrs
      };
    }

TagAttributes
  = _ attributes:Attribute* _ {
      return attributes;
  }


EndTag
  = "</" name:TagName ">" {
      return {
        name: name
      };
    }

TagName
  = _ word:[a-zA-Z0-9:_\.\-]+ { return word.join(""); }

Attribute
  = name:TagName _ "=" _ values:AttributeValues {
      return ["attribute", name, values];
    }
  / name:TagName _ "=" _ property:TextBinding {
      return ["property", name, property];
    }
  / name:TagName {
      return ['attribute', name, []];
    }

AttributeValues
  = '"' values:(TextBinding/(!"{{" [^"])+ { return ["string", text()]; })* '"' { return attrValues(values); }
  / "'" values:(TextBinding/(!"{{" [^'])+ { return ["string", text()]; })* "'" { return attrValues(values); }


TextBinding
  = "{{" _ value:Expression _ "}}" {
      return ["script", value];
    }

BlockBinding
  = script:TextBinding {
    return ["block", script[1]];
  }

Expression
  = TernaryConditional

TernaryConditional
  = condition:Assignment "?" left:TernaryConditional ":" right:TernaryConditional {
      return ["condition", condition, left, right];
    }
  / Assignment

Parameters
  = "(" params:InnerParameters ")" {
      return params;
    }
  / "()" { return []; }

InnerParameters
  = param1:Expression rest:("," Expression)* {
      return [param1].concat(rest.map(function(v) {
        return v[1];
      }));
    }

Assignment
  = left:ObjectReference "=" right:Assignment {
      return ["assign", left, right];
    }
  / Operation

Operation
  = left:Operatable operator: ("&&" / "||" / "===" / "==" / "!==" / "!=" / ">==" / ">=" / ">" / "<==" / "<=" / "<" / "+" / "-" / "%" / "*" / "/") right:Operation {
      return ["operator", operator, left, right];
    }
  / Operatable

Operatable
  = _ value:Modifiers _ { return value; }

Modifiers
  = expression:Not modifiers:Modifier* {

      for (var i = 0, n = modifiers.length; i < n; i++) {
        expression = ["modifier", modifiers[i].name, [expression].concat(modifiers[i].parameters)];
      }

      return expression;
    }
  / (FunctionCall/ObjectReference)

Modifier
  = "|" _ name:ReferenceName parameters:Parameters? _ {
    return {
      name: name,
      parameters: parameters || []
    };
  }

ObjectReference
  = _ context:Object _ { return context; }

Not
  = not:"!" value:Not {
      return ["not", value];
    }
  / not:("!"/"-") value:Not {
      return ["negative", value];
    }
  / Reserved/FunctionCall/ObjectReference

Object
  = Group/Hash/Number/StringLiteral/Reference

Number
  = value:("-"? ([0-9]+DecimalNumber? / DecimalNumber)) {
      return ["literal", parseFloat(text())];
    }

DecimalNumber
  = "." [0-9]+

Group
  = "(" group:Expression ")" { return ["group", group]; }

Reserved
  = expression:(Boolean / Undefined / Null / NaN / Infinity) {
      return expression;
    }

Boolean
  = value:("true"/"false") {
      return ["literal", value === "true"];
    }

Undefined
  = "undefined" { return ["literal", void 0]; }

NaN
  = "NaN" { return ["literal", NaN]; }

Infinity
  = "Infinity" { return ["literal", Infinity]; }

Null
  = ("null"/"NULL") { return ["literal", null]; }

FunctionCall
  = reference:ObjectReference parameters:Parameters {
      return ["call", reference, parameters];
    }

Reference
  = bindingType:("^"/"~>"/"<~>"/"~"/"<~")? _ reference:ReferenceName path:ReferencePart* _ {

      return ["reference", [reference].concat(path), bindingType];
    }


ReferencePart
  = ReferenceKeyPath/ReferenceBrackPath

ReferenceKeyPath
  = "." name:ReferenceName {
    return name;
  }

ReferenceBrackPath
  = "[" key:Expression "]" {
    return key;
  }

ReferenceName
  = name:[a-zA-Z_$0-9]+ { return text(); }

Hash
  = "{" _ values:HashValues? _ "}" {
      return ["hash", values];
    }

HashValues
  = values:HashValuesArray {
      var s = {};
      for (var i = 0, n = values.length; i < n; i++) {
        s[values[i].key] = values[i].value;
      }
      return s;
    }


HashValuesArray
  = firstValue:HashValue additionalValues:("," HashValuesArray)* {
      return [
        firstValue
      ].concat(additionalValues.length ? additionalValues[0][1] : []);
    }

HashValue
  = _ key:HashKey _":" value:Expression? {
      return {
        key: key,
        value: value
      };
    }

HashKey
  = key:StringLiteral { return key[1]; }
  / key:ReferenceName { return key; }


StringLiteral "string"
  = '"' chars:DoubleStringCharacter* '"' {
      return ["string", chars.join("")];
    }
  / "'" chars:SingleStringCharacter* "'" {
      return ["string", chars.join("")];
    }

DoubleStringCharacter
  = !('"' / "\\") SourceCharacter { return text(); }
  / '\\"'

SingleStringCharacter
  = !("'" / "\\") SourceCharacter { return text(); }
  / "\\'"

SourceCharacter
  = .

Word
  = chars:[a-zA-Z]+ { return chars.join(""); }

_
  = [ \n\r\t]*