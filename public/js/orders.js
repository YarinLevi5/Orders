  $(function () {
      $('[data-role="insert-btn"]').click(function () {
          let clientId = $('[data-role="client"]').val();
          let storeId = $('[data-role="store"]').val();
          let data = {
              clientId,
              storeId
          }
          fetch('http://localhost:4000/insert-order', {
              method: 'POST',
              body: JSON.stringify(data)
          }).then(data => $('.msg').toggleClass('show')).catch(e =>
              console.log(e))

          resetFileds();
      })
      $('[data-role="search-all-btn"]').click(function () {
          $.get('http://localhost:4000/find-order', (data) => {
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

      function resetFileds() {
          $("input:text").val("");
      }

      function displayData(data) {
          $('.allDetails').html('');
          $.each(data, (i, value) => {
              $('.allDetails').append(`<div class=information'>
            <p>${`Id:  ${value._id}`}</p>
            <p>${`Client:  ${value.name}`}</p>
            <p>${`Store:  ${value.adress}`}</p></div>`)
          })
      }
  })