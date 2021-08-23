$(document).ready(function(){

	// Check to see if user is a teacher / admin
	if (($.inArray("teacher", window.ENV.current_user_roles) > -1) || ($.inArray("admin", window.ENV.current_user_roles) > -1)){

		// If assignment ID is undefined then we aren't on an assignment page. 
		if (!(window.ENV.ASSIGNMENT_ID === undefined) && $("ul.page-action-list").length){

			const init = {
				method: 'GET',
			};

			let courseID = window.ENV.COURSE_ID
			let assignmentID = window.ENV.ASSIGNMENT_ID

			fetch('/api/v1/courses/' + courseID + '/assignments/' + assignmentID, init)
			.then(response => response.json())
			.then(data =>{
				
				let cDate = new Date(data.created_at)
				let mDate= new Date(data.updated_at)

				$("div#sidebar_content").prepend(
					`<ul class=\"page-action-list\" style=\"padding-bottom:12px; border-bottom: 1px solid #c7cdd1\">\
						<h2>Assignment Info</h2>\
						<li><span style=\"font-weight:bold;\">Date Created:</span> ${cDate.toLocaleDateString('en-AU')}</li>\
						<li><span style=\"font-weight:bold;\">Date Modified:</span> ${mDate.toLocaleDateString('en-AU')}</li>\
					</ul>`
					)
			})
		}
	}
})
