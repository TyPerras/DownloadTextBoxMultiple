$(document).ready(function() {

	/////////////////////////////////////////////////////////
	// RENAME <textarea> AND <input> FORM IDS TO BE UNIQUE //
	/////////////////////////////////////////////////////////
	
	// Find and replace all of the "for" and "id" attributes names in the <label> and <textarea> and <input> attributes so that each textbox answer activity has unique independent names
	// It is neccessary to use labels and ids because it helps with navigation and highlighting for accessibility
	const textAnswerActivityTextareaLabel = document.getElementsByClassName("answerActivityTextareaLabel");
	const textAnswerActivityTextarea = document.getElementsByClassName("answerActivityTextarea");

	const textAnswerActivityInputLabel = document.getElementsByClassName("answerActivityFileNameInputLabel");
	const textAnswerActivityInput = document.getElementsByClassName("answerActivityFileNameInput");

	let i, len;
	for (i = 0, len = textAnswerActivityTextareaLabel.length; i < len; i++) {
		textAnswerActivityTextareaLabel[i].setAttribute('for', 'answerTextarea' + i);
		textAnswerActivityTextarea[i].setAttribute('id', 'answerTextarea' + i);
	}

	len = 0;
	for (i = 0, len = textAnswerActivityInputLabel.length; i < len; i++) {
		textAnswerActivityInputLabel[i].setAttribute('for', 'answerFileName' + i);
		textAnswerActivityInput[i].setAttribute('id', 'answerFileName' + i);
	}



	/////////////////////////////////////
	// ANSWER BTN CLICK EVENT FUNCTION //
	/////////////////////////////////////

	// This Click Event is not only applied to the <li> item, it is also applied to all of the children nested inside of the <li> (<label>, <input>, <span>, <div>)
	// Pressing the Enter Key (or Spacebar) in screen readers whilst focused on a checkbox is treated in the same way as a click event
	$('button.btn-downloadAnswerText').click(function(event) {

		//////////////////////////////////////////////////////
		// FIND THE ANSWER <form> CURRENTLY BEING SUBMITTED //
		//////////////////////////////////////////////////////

		event.preventDefault();

		// event <button> element
		const TxtAnswerSubmitBtn = event.target;
		// <form> element
		const TxtAnswerFormElement = TxtAnswerSubmitBtn.parentElement;
		// <form> element children
		const TxtAnswerFormElementChildren = TxtAnswerFormElement.children;

		// This logs "FORM"
		// console.log("TxtAnswerFormElementChildren[0].tagName: " + TxtAnswerFormElementChildren[0].tagName);

		// This logs "SECTION"
		// console.log("TxtAnswerSection.tagName " + TxtAnswerSection.tagName);



		////////////////////////////////////////////////////////////////////////////////////
		// GET TEXT QUESTION TEXT <span>, <textarea>, and <input> CONTENTS OF QUESTION(S) //
		////////////////////////////////////////////////////////////////////////////////////

		// Declare variables outside of loop so that we can use them later (scope)
		var TxtAnswerFilenameInput = null;
		const TxtAnswerFormLabelTextareaElement = [];
		const TxtAnswerSpanQuestionTitle = [];

		len = 0;
		for (i = 0, len = TxtAnswerFormElementChildren.length; i < len; i++) {
			// Filter out all the children except for the <form> elements
			if (TxtAnswerFormElementChildren[i].tagName == "DIV") {
				// Get a <form> child <div> [object HTMLDivElement]
				const TxtAnswerDivItem = TxtAnswerFormElementChildren[i];
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
			} else if (TxtAnswerFormElementChildren[i].tagName == "LABEL") {
				// Get <form> child <label> [object HTMLLabelElement]
				const TxtAnswerLabelItem = TxtAnswerFormElementChildren[i];
				// Get <label> children
				const TxtAnswerLabelItemChildren = TxtAnswerLabelItem.children;
				// Get <label> first child [object HTMLInputElement]
				TxtAnswerFilenameInput = TxtAnswerLabelItemChildren[0];

				// console.log("TxtAnswerFilenameInput.value: " + TxtAnswerFilenameInput.value);
			}

		}

		// console.log("TxtAnswerSpanQuestionTitle: " + TxtAnswerSpanQuestionTitle[0].innerHTML + " " + TxtAnswerSpanQuestionTitle[1].innerHTML);



		///////////////////////////////////////////////////////////
		// IF THE <input> IS NOT NULL, RUN THE DOWNLOAD FUNCTION //
		///////////////////////////////////////////////////////////

		// If the learner input an answer for the <textarea> and specified a file name in the <input> then run the download file function
		if (TxtAnswerFilenameInput.value) {
			// console.log("TxtAnswerSpanQuestionTitle.innerHTML: " + TxtAnswerSpanQuestionTitle[0].innerHTML + " " + TxtAnswerSpanQuestionTitle[1].innerHTML);
			downloadTxtAnswerFile(TxtAnswerSpanQuestionTitle, TxtAnswerFormLabelTextareaElement, TxtAnswerFilenameInput.value);
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
			content[i] = "Question: " + questionTitle[i].innerHTML + "\r\n\r\n" + "Answer:" + "\r\n" + textAnswerContent[i].value + "\r\n\r\n" + "----------" + "\r\n\r\n";
			// console.log(content);
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




