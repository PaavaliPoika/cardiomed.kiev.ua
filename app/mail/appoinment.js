$(function () {
  $(
    '#appoinmentForm input, #appoinmentForm select, #appoinmentForm textarea'
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $('input#name').val();
      var email = $('input#email').val();
      var phone = $('input#phone').val();
      var department = $('select#department').val();
      var message = $('textarea#message').val();

      var th = $('#sendMessageButton');
      th.prop('disabled', true);

      $.ajax({
        url: 'appoinment.php',
        type: 'POST',
        data: {
          name: name,
          email: email,
          phone: phone,
          department: department,
          message: message,
        },
        cache: false,
        success: function () {
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append('</button>');
          $('#success > .alert-success').append(
            '<strong>Ваше повідомлення було відправлене. </strong>'
          );
          $('#success > .alert-success').append('</div>');
          $('#appoinmentForm').trigger('reset');
        },
        error: function () {
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append('</button>');
          $('#success > .alert-danger').append(
            $('<strong>').text(
              'Вибачте ' +
                name +
                ', здається, що наш поштовий сервер не відповідає. Будь-ласка спробуйте пізніше!'
            )
          );
          $('#success > .alert-danger').append('</div>');
          $('#appoinmentForm').trigger('reset');
        },
        complete: function () {
          setTimeout(function () {
            th.prop('disabled', false);
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(':visible');
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});

$('#name').focus(function () {
  $('#success').html('');
});
