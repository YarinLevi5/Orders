  $(function () {
      $('[data-role="insert-btn"]').click(() => {
          let obj = {
              name: $('[data-role="name"]').val(),
              adress: $('[data-role="adress"]').val(),
              phone: $('[data-role="phone"]').val()
          }
          fetch('http://localhost:4000/insert-store', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
          }).then(data => {
              $('.msg').addClass('show')
              resetFileds()
          }).catch(err => console.log(
              err))
      })

      $('[data-role="search-all-btn"]').click(function () {
          $.get('http://localhost:4000/find-store', (data) => {
              displayData(data);
          })
      })

      $('[data-role="search-name-btn"]').click(() => {
          let name = $('[data-role="name-paramter"]').val();
          fetch('/find-store-name/' + name)
              .then(res => res.json()).
          then(data => displayData(data))
              .catch(err => console.log(err))
          resetFileds();
      })


      $('[data-role="search-id-btn"]').click(() => {
          let id = $('[data-role="id-paramter"]').val();
          fetch('http://localhost:4000/find-store-id/' + id)
              .then(res => res.json())
              .then(data => displayData(data))
              .catch(err => console.log(err))
          resetFileds();
      })

      $('[data-role="edit-id-btn"]').click(() => {

          let id = $('[data-role="id-paramter"]').val();
          fetch('http://localhost:4000/find-store-id/' + id)
              .then(res => res.json())
              .then(data => loopData(data))
              .catch(err => console.log(err))

          let saveBtn = $('<input:button>').text('Save').attr('class', 'save-btn');
          $('.store-fileds').append(saveBtn);

          saveBtn.click(() => {
              let newData = {
                  name: $('[data-role="name"]').val(),
                  adress: $('[data-role="adress"]').val(),
                  phone: $('[data-role="phone"]').val()
              }
              $.ajax({
                  url: "http://localhost:4000/store/" + id,
                  data: newData,
                  type: 'PUT',
                  success: $('.store-fileds').append(
                      '<p style="color:green">Data saved</p>')
              });
              resetFileds();
          })
          resetFileds();
      })

      let loopData = (data) => {
          $.each(data, (i, key) => {
              let name = (key.name),
                  adress = (key.adress),
                  phone = (key.phone)

              $('[data-role="name"]').val((name));
              $('[data-role="adress"]').val((adress));
              $('[data-role="phone"]').val((phone));
          })
      }

      function resetFileds() {
          $("input:text").val("");
      }

      function displayData(data) {
          $('.allDetails').html('');
          $.each(data, (i, value) => {
              $('.allDetails').append(`<div class='information'>
            <p>${`Id:  ${value._id}`}</p>
            <p>${`Name:  ${value.name}`}</p>
             <p>${`Adress:  ${value.adress}`}</p>
             <p>${`Phone:  ${value.phone}`}</p></div>`)
          })
      }
  })