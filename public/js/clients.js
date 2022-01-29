  $(function () {

      $('[data-role="insert-btn"]').click(function () {
          let boolean = false;
          if ($('[data-role="vip"]').is(":checked")) {
              boolean = true;
          }
          let obj = {
              name: $('[data-role="name"]').val(),
              adress: $('[data-role="adress"]').val(),
              isVip: boolean,
              phone: $('[data-role="phone"]').val()
          }

          $.post('http://localhost:4000/insert-client', obj, () => {
              $('.client-fileds').append(
                  '<p style="color:green">Data was inserted successfully</p>')
          })
          resetFileds();
      })

      $('[data-role="search-name-btn"]').click(() => {
          let name = $('[data-role="name-paramter"]').val();
          $.get(`http://localhost:4000/client?name=${name}`, function (data) {
              displayData(data);
          })
          resetFileds();
      })

      $('[data-role="search-id-btn"]').click(() => {
          let id = $('[data-role="id-paramter"]').val();
          $.get("http://localhost:4000/client/" + id, function (data) {
              displayData(data);
          })
          resetFileds();
      })

      $('[data-role="edit-id-btn"]').click(() => {

          let id = $('[data-role="id-paramter"]').val();
          $.get("http://localhost:4000/client/" + id, function (data) {

              $.each(data, (i, key) => {
                  let name = (JSON.stringify(key.name)),
                      adress = (JSON.stringify(key.adress)),
                      phone = (JSON.stringify(key.phone)),
                      vip = (key.isVip);

                  $('[data-role="name"]').val(JSON.parse(name));
                  $('[data-role="adress"]').val(JSON.parse(adress));
                  $('[data-role="phone"]').val(JSON.parse(phone));
                  $('[data-role="vip"]').prop('checked', vip);
              })

              let saveBtn = $('<input:button>').text('Save').attr('class', 'save-btn');
              $('.client-fileds').append(saveBtn);

              saveBtn.click(() => {
                  let boolean = false;
                  if ($('[data-role="vip"]').is(":checked")) {
                      boolean = true;
                  }
                  let newData = {
                      name: $('[data-role="name"]').val(),
                      adress: $('[data-role="adress"]').val(),
                      isVip: boolean,
                      phone: $('[data-role="phone"]').val()
                  }
                  $.ajax({
                      url: "http://localhost:4000/client/" + id,
                      data: newData,
                      type: 'PUT',
                      success: $('.client-fileds').append(
                          '<p style="color:green">Data saved</p>')
                  });
                  resetFileds();
              })

          })
          resetFileds();
      })

      $('[data-role="search-all-btn"]').click(function () {
          fetch('http://localhost:4000/find-client')
              .then(res => res.json())
              .then(data => displayData(data)).catch(err => console.log(err))
      })

      function resetFileds() {
          $("input:text").val("");
          $('[data-role="vip"]').prop('checked', false);
      }

      function displayData(data) {
          $('.allDetails').html('');
          $.each(data, (i, value) => {
              let stringVal = JSON.stringify(value);
              let parseVal = JSON.parse(stringVal);
              $('.allDetails').append(`<div class=information>
             <p>Id:  ${parseVal._id}</p>                 
            <p>Name:  ${parseVal.name}</p>
            <p>Adress:  ${parseVal.adress}</p>
            <p>VIP:  ${parseVal.isVip}</p>
            <p>Phone:  ${parseVal.phone}</p></div>`)
          })
      }
  })