let hexInput = document.getElementById("hex");
let rgbInput = document.getElementById("rgb");

//  windows onload 
window.onload = () => {
    hexInput.value = "";
    rgbInput.value = "";
}

//  if user put a valid input:
function valid (element) {
    element.style.color = "#202040";
}

//  if user put a invalid input:
function invalid (element, otherElement) {
    element.style.color = "#f04624";
    otherElement.value  = 0;
}



//  Function to Convert RGB:
function toRgb () {
    let hexCode = hexInput.value;
    let rgbArr  = [];

    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
        valid (hexInput);
        hexCode = hexCode.split("#")[1] || hexCode;
        for (let i = 0; i < hexCode.length; i += 2) {
            rgbArr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
        }
        rgbInput.value = `rgb(${rgbArr})`;
        document.querySelector(".wrapper").style.backgroundColor = `rgb(${rgbArr})`;
    } else {
        invalid(hexInput, rgbInput);
    }
}



//  Function to Convert Hex:
function toHex () {
    let rgbCode   = rgbInput.value;
    let rgbRegex1 = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;
    let rgbRegex2 = /^[0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}$/;
    let hex       = "#";

    if (rgbRegex1.test(rgbCode) || rgbRegex2.test(rgbCode)) {
        rgbCode = rgbCode.replace(/[rgb()]+/g,"") || rgbCode;
        rgbCode = rgbCode.split(",");
        let condition = rgbCode.every((value) => {
            return parseInt(value) <= 255;
        });

        if (condition) {
            valid(rgbInput);
            rgbCode.forEach(value => {
                value = parseInt(value).toString(16);
                hex += value.length == 1 ? "0"+value : value;
            });
            hexInput.value = hex;
            document.querySelector(".wrapper").style.backgroundColor = hex;
            
        } else {
            invalid(rgbInput, hexInput)
        }
    }
}