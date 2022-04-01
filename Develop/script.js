$(document).ready(function () {
    // Gets current date to display in jumbotron
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // Gets time slot information from the local storage when the page is loaded
    $("#9am .description").val(localStorage.getItem("9am"));
    $("#10am .description").val(localStorage.getItem("10am"));
    $("#11am .description").val(localStorage.getItem("11am"));
    $("#12pm .description").val(localStorage.getItem("12pm"));
    $("#1pm .description").val(localStorage.getItem("1pm"));
    $("#2pm .description").val(localStorage.getItem("2pm"));
    $("#3pm .description").val(localStorage.getItem("3pm"));
    $("#4pm .description").val(localStorage.getItem("4pm"));
    $("#5pm .description").val(localStorage.getItem("5pm"));

    // Updates schedule colors dynamically by checking the time slots with the current time
    function trackHours() {
        // Gets the current hour for comparison
        var currentHour = moment().hour();
  
        // Checks every time block, converts its hour to 24-hr format in order to compare with current hour
        $(".time-block").each(function () {
            var unformattedHour = parseInt($(this).attr("id"));

            if (unformattedHour < 9) {
                var blockHour = unformattedHour + 12;
            } else {
                var blockHour = unformattedHour;
            }

            // Past
            if (blockHour < currentHour) {
                $(this).addClass("past");
                $(this).removeClass("present");
                $(this).removeClass("future");
                
            }
            // Present
            else if (blockHour === currentHour) {
                $(this).removeClass("past");
                $(this).addClass("present");
                $(this).removeClass("future");
            }
            // Future
            else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        })
    }

    // Event listener for save button that saves the time slot and its text to local storage
    $(".saveBtn").on("click", function () {
        var time = $(this).parent().attr("id");
        var activity = $(this).siblings(".description").val();

        localStorage.setItem(time, activity);
    })

    // Calls method to check what color the time slots should be depending on current time
    trackHours();
})