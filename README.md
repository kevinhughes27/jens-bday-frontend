Jen's BDay Frontend
===================

[https://jensparty.5apps.com/](https://jensparty.5apps.com/)

A ranked ballot voting frontend for Jen's annual Birthday Food/Drink pairing competition. This repo is for the client side react.js app for submitting votes. The backend just appends the votes as a new row in a Google spreadsheet.

![screenshot](https://raw.githubusercontent.com/kevinhughes27/jens-bday-frontend/master/screenshot.jpg)

Spreadsheet code:

```javascript
function doPost(e){
  return handleResponse(e);
}

function handleResponse(e) {   
  try {
    var sheet = SpreadsheetApp.openById('1pZG3WMKGuy-9EJ0Ojx0WurshKjO1ywvP3QOjiTr7IAc').getSheetByName('Votes');

    var data = e.parameter;
    var row = [new Date(), data['fingerprint'], data['vote_1'], data['vote_2'], data['vote_3']];

    sheet.appendRow(row);

    return ContentService
    .createTextOutput(JSON.stringify({"result":"success"}))
          .setMimeType(ContentService.MimeType.JSON);

  } catch(e) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
```

* Make sure you deploy the script as a web app.

Votes are counted by using a `COUNTIF` function on the vote columns:

```
=COUNTIF(Votes!C:C, A2)*3 + COUNTIF(Votes!D:D, A2)*2 + COUNTIF(Votes!E:E, A2)
```

where `A2` is the name of the item to compare against the votes.


Development
-----------

All development is handled through npm scripts (start, build and watch).

Deployment is to 5apps via git push
