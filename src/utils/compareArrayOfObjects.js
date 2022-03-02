export default function compareArrayOfObjects(arr1, arr2) {
    if (!arr1 || !arr2)
        return false;
    if (arr1.length != arr2.length)
        return false;

    for (var i = 0, l = arr1.length; i < l; i++) {
        if (!compareObjects(arr1[i], arr2[i]))
            return false;
    }
    return true;
}

export function compareObjects(obj1, obj2) {
    let propName;
    for (propName in obj1) {
        //Check for inherited methods and properties - like .equals itself
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        //Return false if the return value is different
        if (obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)) {
            return false;
        }
        //Check instance type
        else if (typeof obj1[propName] != typeof obj2[propName]) {
            //Different types => not equal
            return false;
        }
    }
    //Now a deeper check using other objects property names
    for (propName in obj2) {
        //We must check instances anyway, there may be a property that only exists in object2
        //I wonder, if remembering the checked values from the first loop would be faster or not 
        if (obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof obj1[propName] != typeof obj2[propName]) {
            return false;
        }
        //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
        if (!obj1.hasOwnProperty(propName))
            continue;

        //Now the detail check and recursion

        //This returns the script back to the array comparing
        /**REQUIRES Array.equals**/
        if (obj1[propName] instanceof Array && obj2[propName] instanceof Array) {
            // recurse into the nested arrays
            if (!compareObjects(obj1[propName], obj2[propName]))
                return false;
        }
        else if (obj1[propName] instanceof obj1 && obj2[propName] instanceof Object) {
            // recurse into another objects
            //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
            if (!compareObjects(obj1[propName], obj2[propName]))
                return false;
        }
        //Normal value comparison for strings and numbers
        else if (obj1[propName] != obj2[propName]) {
            return false;
        }
    }
    //If everything passed, let's say YES
    return true;
}  