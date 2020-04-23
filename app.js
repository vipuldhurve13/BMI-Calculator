
var domStrings = {
    btnEnglish: '#english',
    btnMetric: '#metric',
    metricHeight: '.metric-height',
    englishHeight: '.english-height',
    englishHeightInches: '.english-height-inches',
    weight: '.weight',
    age: '.age-box',
    btnMale: '.male',
    btnFemale: '.female',
    btnCalculate: '#btnCalculate',
    btnStartover1: '#btnStartOver1',
    btnStartOver2: '#btnStartOver2'
};

// Functions for calculating BMI - English and Metric respectively-----------------------------------------------

var metricBMI = function (ht, wt) {
    var res;
    res = (wt / (ht * ht)) * 10000;
    return res.toFixed(1);

};

var englishBMI = function (ht, htIN, wt) {
    var b, res;
    b = ht * 12;
    ht = b + parseInt(htIN);
    res = (wt / (ht * ht)) * 703;
    return res.toFixed(1);
};

// Function for Showing results --------------------------------------------------------------------------------------------

var showResult = function (age, bmiValue) {
    var html, newHtml, weightClass;

    if (bmiValue < 18.5) {
        weightClass = 'underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        weightClass = 'normal Weight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        weightClass = 'overweight';
    } else if (bmiValue >= 30) {
        weightClass = 'obese';
    }



    html = '<div class="result"> <div class="yourResults"> Your Results </div>  <div class="bmiResult">Based on your body mass index (BMI) of %bmi% , you are classed at a %class%.</div><div class="imgContainer"><img class="bmiImage" src="bmi.png"><span class="content">A healthy BMI is between 18.5 and 24.9, but these numbers can vary for athletes, pregnant women, and between ethnicities. <br /> <br />  An overweight BMI is generally associated with higher risk of chronic diseases like heartdisease and diabetes. Your health care provider can help you better understand the reasons you’re overweight and how they affect your health. <br /> <br />  Remember that BMI is interpreted and classified differently for children ages 2 to 20. Health professionals use <a href="https://www.verywellfit.com/bmi-calculators-3879979">growth charts and percentiles</a > based on age and sex.</span></div> <div class="calculate-container"><div class="calculate-container" id="startOver2Container"><button onclick="return initialize();" id="btnStartOver2" class="calculate">STARTOVER</button></div></div>';


    // Replace the placeholder text with some actual data
    newHtml = html.replace('%bmi%', bmiValue);
    newHtml = newHtml.replace('%class%', weightClass);

    //Insert the HTML into the DOM
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', newHtml);


    document.querySelector('.startOverContainer').style.display = 'block';
    document.querySelector('.calculate-container').style.display = 'none';



}

//FUnctions for updating UI for English and Metric Form-------------------------------------------------------

var metricForm = function () {
    document.querySelector(domStrings.metricHeight).style.display = 'inline-block';
    document.querySelector(domStrings.englishHeight).style.display = 'none';
    document.querySelector(domStrings.englishHeightInches).style.display = 'none';
    document.querySelector(domStrings.age).style.width = '50.5%';
    document.getElementsByName('weight-box')[0].placeholder = 'Current Weight                  \t \t   \t \t                    \t \t \t \t \t \t Kg';
};

var englishForm = function () {
    document.querySelector(domStrings.metricHeight).style.display = 'none';
    document.querySelector(domStrings.englishHeight).style.display = 'inline-block';
    document.querySelector(domStrings.englishHeightInches).style.display = 'inline-block';
    document.querySelector(domStrings.age).style.width = '38%';
    document.getElementsByName('weight-box')[0].placeholder = 'Current Weight                \t \t   \t \t                \t \t \t \t \t \t  lbs';
};

//Initialize Function for start over button----------------------------------------------------

function initialize() {

    var fields, fieldsArray;

    fields = document.querySelectorAll(domStrings.metricHeight + ',' + domStrings.englishHeight + ',' + domStrings.englishHeightInches + ',' + domStrings.age + ',' + domStrings.weight);

    fieldsArray = Array.prototype.slice.call(fields);

    fieldsArray.forEach(function (current) {
        current.value = "";
    });

    var el = document.querySelector('.result');
    el.parentNode.removeChild(el);

    document.querySelector('.calculate-container').style.display = 'block';

    document.querySelector('.startOverContainer').style.display = 'none';


};

function invalidCheck() {
    var genderVal = document.getElementsByName("gender");
    for (var i = 0; i < genderVal.length; i++) {
        if (genderVal[i].checked == true) {
            document.querySelector('.invalid').style.display = 'none';
        }
    };
}


//App Controler---------------------------------------------------------------------------------------------

function validateForm() {
    var genderVal = document.getElementsByName("gender");
    for (var i = 0; i < genderVal.length; i++) {
        if (genderVal[i].checked == true) {
            document.querySelector('.invalid').style.display = 'none';
            var radioButtons = document.getElementsByName("radio1");

            var metHeight, engHeight, engHeightIn, weightVal, ageVal, bmi;

            metHeight = document.querySelector(domStrings.metricHeight).value;
            engHeight = document.querySelector(domStrings.englishHeight).value;
            engHeightIn = document.querySelector(domStrings.englishHeightInches).value;
            weightVal = document.querySelector(domStrings.weight).value;
            ageVal = document.querySelector(domStrings.age).value;


            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked == true) {

                    if (radioButtons[i].value === 'eng') {
                        if (engHeight !== "" && engHeightIn !== "" && weightVal !== "") {

                            //Calculate english BMI
                            bmi = englishBMI(engHeight, engHeightIn, weightVal);

                            //Show Result
                            showResult(ageVal, bmi);
                        }

                    } else if (radioButtons[i].value === 'met') {
                        if (metHeight !== "" && weightVal !== "") {

                            //Calculate Metric BMI
                            bmi = metricBMI(metHeight, weightVal);

                            //Show Result
                            showResult(ageVal, bmi);
                        }

                    }


                }
            }

        } else { document.querySelector('.invalid').style.display = 'block'; }
    };
};
