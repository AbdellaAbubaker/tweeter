$(document).ready(function () {
    const textarea = $("#tweet-text");
    const counter = $(".counter");

    textarea.on("input", function () {
        const remaining = 140 - textarea.val().length;
        counter.text(remaining);
        if (remaining < 0) {
            counter.css("color", "red");
        } else {
            counter.css("color", "");
        }
    });

});


// $(document).ready(function () {
//     $('.new-tweet textarea').on('input', function () {
//         var textLength = $(this).val().length;
//         var remainingChars = 140 - textLength;

//         $('.counter').text(remainingChars);

//         if (remainingChars < 0) {
//             $('.counter').addClass('invalid')
//         } else {
//             $('.counter').removeClass('invalid');
//         }
//     });
// });