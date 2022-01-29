  $(function () {

      $.ajax({
          url: '/find-client',
          dataType: 'json',
          success: function (selectValues) {
              $.each(selectValues, function (i, value) {
                  $('#clientList').append($("<option></option>").attr("value", i).text(value._id));
              })
          }
      })
      $.ajax({
          url: '/find-store',
          dataType: 'json',
          success: function (selectValues) {
              $.each(selectValues, function (i, value) {
                  $('#storeList').append($("<option></option>").attr("value", i).text(value._id));
              })
          }
      })

      $('[data-role="insert-btn"]').click(function () {
          let client = $('#clientList').find(":selected").text();
          let store = $('#storeList').find(":selected").text();
          let data = {
              client,
              store
          }
          fetch('http://localhost:4000/insert-order', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(data => $('.msg').toggleClass('show')).catch(e =>
              console.log(e))
      })

      $('[data-role="editBtn"]').click(() => {

          let id = $('[data-role="id-paramter"]').val();
          $.get('/order/' + id, (data) => {
              $.each(data, (i, val) => {
                  $('#clientList').find(":selected").text(val.client);
                  $('#storeList').find(":selected").text(val.store);
              })

              let saveBtn = $('<input:button>').text('Save').attr('class', 'save-btn');
              $('.orders-fileds').append(saveBtn);

              $('.save-btn').click(function () {

                  let newFileds = {
                      client: $('#clientList').find(":selected").text(),
                      store: $('#storeList').find(":selected").text()
                  }
                  $.ajax({
                      url: "http://localhost:4000/order/" + id,
                      data: newFileds,
                      type: 'PUT',
                      success: $('.orders-fileds').append(
                          '<p style="color:green">Data saved</p>')
                  })
              })

          })
      })

      $('[data-role="search-all-btn"]').click(function () {
          $.get('http://localhost:4000/find-order', (data) => {
              console.log(data);
              displayData(data)
          })
      })

      $.ajax({
          url: '/find-store',
          dataType: 'json',
          success: function (selectValues) {
              $.each(selectValues, function (i, value) {
                  $('#list').append($("<option></option>").attr("value", i).text(value.name));
              })
          }
      })

      function displayData(data) {
          $('.allDetails').html('');
          $.each(data, (i, value) => {
              $('.allDetails').append(`<div class= information>
            <p>${`Id:  ${value._id}`}</p>
            <p>${`Client:  ${value.client}`}</p>
            <p>${`Store:  ${value.store}`}</p></div>`)
          })
      }
  })