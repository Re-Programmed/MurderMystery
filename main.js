
/*
    An HTML string that can have template variables that can be replaced by objects when Paste(...) is called.
*/
class HTMLObjectTemplate
{
    content;
    variables;

    /*
        Creates a template object with the specified content and replacement strings.
    */
    constructor(content, ...vars)
    {
        this.content = content;

        this.variables = vars;
    }

    /*
        Returns the template object with each variable replaced by the given option in order.
    */
    Paste(...options)
    {
        var result = this.content;

        for(var i = 0; i < this.variables.length; i++)
        {
            if(options.length <= i){break;}

            result.replaceAll(this.variables[i], options[i]);
        }

        var endElement = document.createElement("div");
        endElement.innerHTML = result;
        return endElement;
    }
}