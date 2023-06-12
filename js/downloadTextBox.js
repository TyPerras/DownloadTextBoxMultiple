$(document).ready(function() {

	/////////////////////////////////////////////////////////
	// RENAME <textarea> AND <input> FORM IDS TO BE UNIQUE //
	/////////////////////////////////////////////////////////
	
	// Find and replace all of the "for" and "id" attributes names in the <label> and <textarea> and <input> attributes so that each textbox answer activity has unique independent names
	// It is neccessary to use labels and ids because it helps with navigation and highlighting for accessibility

	// const textAnswerActivityTextareaLabel = document.getElementsByClassName("answerActivityTextareaLabel");
	// const textAnswerActivityTextarea = document.getElementsByClassName("answerActivityTextarea");

	// let i, len;
	// for (i = 0, len = textAnswerActivityTextareaLabel.length; i < len; i++) {
	// 	textAnswerActivityTextareaLabel[i].setAttribute('for', 'answerTextarea' + i);
	// 	textAnswerActivityTextarea[i].setAttribute('id', 'answerTextarea' + i);
	// }


	const textAnswerActivityInputLabel = document.getElementsByClassName("answerActivityFileNameInputLabel");
	const textAnswerActivityInput = document.getElementsByClassName("answerActivityFileNameInput");

	len = 0;
	for (i = 0, len = textAnswerActivityInputLabel.length; i < len; i++) {
		textAnswerActivityInputLabel[i].setAttribute('for', 'answerFileName' + i);
		textAnswerActivityInput[i].setAttribute('id', 'answerFileName' + i);
	}
	



	$('.answerActivityFileNameInputLabel .answerActivityFileNameInput').on('focus', function(inputFocusEvent) {
		var inputFocusEventTarget = inputFocusEvent.target;
		console.log(inputFocusEventTarget);

		if (inputFocusEventTarget.classList.contains("is-invalid")) {
			// console.log("Currently Invalid");
			inputFocusEventTarget.classList.remove("is-invalid");
		}


		// TxtAnswerLabelItem = TxtAnswerSectionElementChildren[i];
		// // Get <label> children
		// const TxtAnswerLabelItemChildren = TxtAnswerLabelItem.children;
		// // Get <label> first child [object HTMLInputElement]
		// TxtAnswerLabelDivGroup = TxtAnswerLabelItemChildren[0];
		// var TxtAnswerLabelDivGroupChildren = TxtAnswerLabelDivGroup.children;
		// var TxtAnswerInput = TxtAnswerLabelDivGroupChildren[0];

	});




	/////////////////////////////////////
	// ANSWER BTN CLICK EVENT FUNCTION //
	/////////////////////////////////////

	var TxtAnswerSectionElementChildren;

	// This Click Event is not only applied to the <li> item, it is also applied to all of the children nested inside of the <li> (<label>, <input>, <span>, <div>)
	// Pressing the Enter Key (or Spacebar) in screen readers whilst focused on a checkbox is treated in the same way as a click event
	$('button.btn-downloadAnswerText').click(function(event) {

		//////////////////////////////////////////////////////
		// FIND THE ANSWER <section> CURRENTLY BEING SUBMITTED //
		//////////////////////////////////////////////////////

		// Prevent the default because the default will post the form to itself and refresh the page
		// event.preventDefault();

		// event <button> element
		const TxtAnswerSubmitBtn = event.target;
		// <section> element
		const TxtAnswerSectionElement = TxtAnswerSubmitBtn.parentElement;
		// <section> element children
		TxtAnswerSectionElementChildren = TxtAnswerSectionElement.children;

		// This logs "DIV"
		// console.log("TxtAnswerSectionElementChildren[0].tagName: " + TxtAnswerSectionElementChildren[0].tagName);



		////////////////////////////////////////////////////////////////////////////////////
		// GET TEXT QUESTION TEXT <span>, <textarea>, and <input> CONTENTS OF QUESTION(S) //
		////////////////////////////////////////////////////////////////////////////////////

		// Declare variables outside of loop so that we can use them later (scope)
		var TxtAnswerLabelDivGroup = null;
		var TxtAnswerLabelItem = null;
		const TxtAnswerFormLabelTextareaElement = [];
		const TxtAnswerSpanQuestionTitle = [];

			len = 0;
			for (i = 0, len = TxtAnswerSectionElementChildren.length; i < len; i++) {

				// Check to make sure the element still exists. Deleted children items (alert <div>) don't decrease total children count
				// if (TxtAnswerSectionElementChildren[i] != null) {

					// console.log("TxtAnswerSectionElementChildren[i]: " + TxtAnswerSectionElementChildren[i] + " i: " + i);
					
					// Find the question container <div>. Make sure that the <div> is not the fileNameIsInvalidAlert div
					if (TxtAnswerSectionElementChildren[i].tagName == "DIV" && TxtAnswerSectionElementChildren[i].classList.contains("questionContainer")) {
						
						// Get a <form> child <div> [object HTMLDivElement]
						const TxtAnswerDivItem = TxtAnswerSectionElementChildren[i];
						// Children <div> items [object HTMLCollection]
						const TxtAnswerDivItemChildren = TxtAnswerDivItem.children;
						// Question title <span> item [object HTMLSpanElement]
						TxtAnswerSpanQuestionTitle[i] = TxtAnswerDivItemChildren[0];
						// Question label [object HTMLLabelElement]
						const TxtAnswerFormLabel = TxtAnswerDivItemChildren[1];
						// Question label Children
						const TxtAnswerFormLabelChildren = TxtAnswerFormLabel.children;
						// Question textarea [object HTMLTextAreaElement]
						TxtAnswerFormLabelTextareaElement[i] = TxtAnswerFormLabelChildren[0];
						// console.log("TxtAnswerSpanQuestionTitle.innerHTML: " + TxtAnswerSpanQuestionTitle.innerHTML);
						// console.log("TxtAnswerFormLabelTextareaElement.value: " + TxtAnswerFormLabelTextareaElement.value);

					} else if (TxtAnswerSectionElementChildren[i].tagName == "LABEL") {

						// console.log("found label");
						// Get <form> child <label> [object HTMLLabelElement]
						TxtAnswerLabelItem = TxtAnswerSectionElementChildren[i];
						// Get <label> children
						const TxtAnswerLabelItemChildren = TxtAnswerLabelItem.children;
						// Get <label> first child [object HTMLInputElement]
						TxtAnswerLabelDivGroup = TxtAnswerLabelItemChildren[0];
						var TxtAnswerLabelDivGroupChildren = TxtAnswerLabelDivGroup.children;
						var TxtAnswerInput = TxtAnswerLabelDivGroupChildren[0];
						// console.log("TxtAnswerInput.value: " + TxtAnswerInput.value);
						var TxtAnswerInputValue = TxtAnswerInput.value;
						// console.log("TxtAnswerLabelDivGroup.value: " + TxtAnswerLabelDivGroup.value);

					} 
					// else if (TxtAnswerSectionElementChildren[i].classList.contains("fileNameIsInvalidAlert")) {

					// 	// Delete filename is invalid alert notification
					// 	TxtAnswerSectionElement.removeChild(TxtAnswerSectionElementChildren[i]);

					// }

				// }

			}

		// console.log("TxtAnswerSpanQuestionTitle: " + TxtAnswerSpanQuestionTitle[0].innerHTML + " " + TxtAnswerSpanQuestionTitle[1].innerHTML);

		///////////////////////////////////////////////////////////
		// IF THE <input> IS NOT NULL, RUN THE DOWNLOAD FUNCTION //
		///////////////////////////////////////////////////////////

		// If the learner input an answer for the <textarea> and specified a file name in the <input> then run the download file function
		if (TxtAnswerInputValue) {
			// console.log("TxtAnswerSpanQuestionTitle.innerHTML: " + TxtAnswerSpanQuestionTitle[0].innerHTML + " " + TxtAnswerSpanQuestionTitle[1].innerHTML);
			downloadTxtAnswerFile(TxtAnswerSpanQuestionTitle, TxtAnswerFormLabelTextareaElement, TxtAnswerInputValue);
		} else {
			alert("The file name input field is required and cannot be left empty. Please input a file name before saving it as a textfile.");
			TxtAnswerInput.classList.add("is-invalid");

			// // This creates the red feedback text div
			// let divFileNameInvalidFeedbackText = document.createElement('div');
			// divFileNameInvalidFeedbackText.className = "invalid-feedback";
			// divFileNameInvalidFeedbackText.role = "alert";
			// divFileNameInvalidFeedbackText.textContent = '*Please choose a file name.';
			// // Place the alert box BEFORE (above) the submit button (submit button = TxtAnswerLabelItem.nextSibling)
			// TxtAnswerLabelItem.parentNode.insertBefore(divFileNameInvalidFeedbackText, TxtAnswerLabelItem.nextSibling);
		}


	});



	//////////////////////////////
	// DOWNLOAD ANSWER FUNCTION //
	//////////////////////////////

	function downloadTxtAnswerFile(questionTitle, textAnswerContent, filename) {

		// console.log("questionTitles: " + questionTitle[0].innerHTML + " " + questionTitle[1].innerHTML);
		// console.log("textAnswerContent: " + textAnswerContent[0].value + " " + textAnswerContent[1].value);
		// console.log("filename: " + filename);

		const content = [];

		len = 0;
		for (i = 0, len = questionTitle.length; i < len; i++) {


			if (TxtAnswerSectionElementChildren[i].tagName == "DIV") {
				// if (TxtAnswerSectionElementChildren[i].classList.contains("fileNameIsInvalidAlert")) {
					content[i] = "Question: " + questionTitle[i].innerHTML + "\r\n\r\n" + "Answer:" + "\r\n" + textAnswerContent[i].value + "\r\n\r\n" + "----------" + "\r\n\r\n";
					// console.log(content);
					// console.log("TxtAnswerSectionElementChildren[i].classList.contains(\"questionContainer\")" + TxtAnswerSectionElementChildren[i].classList.contains("questionContainer"));
				// }
			}

		}

		contentRemoveCommas = content.join("");

		const filenameWithExtension = filename + ".txt";

		// It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
		const TxtAnswerAnchorElement = document.createElement('a');

		// A blob is a data type that can store binary data
		// "type" is a MIME type
		// It can have a different value, based on a file you want to save
		const TxtAnswerBlob = new Blob([contentRemoveCommas], { type: 'plain/text' });

		// createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
		const TxtAnswerFileUrl = URL.createObjectURL(TxtAnswerBlob);

		// setAttribute() Sets the value of an attribute on the specified element.
		TxtAnswerAnchorElement.setAttribute('href', TxtAnswerFileUrl); // file location
		TxtAnswerAnchorElement.setAttribute('download', filenameWithExtension); // file name
		TxtAnswerAnchorElement.style.display = 'none';

		// use appendChild() method to move an element from one element to another
		document.body.appendChild(TxtAnswerAnchorElement);
		TxtAnswerAnchorElement.click();

		// The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
		document.body.removeChild(TxtAnswerAnchorElement);

	}



});




