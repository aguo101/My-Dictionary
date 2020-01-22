let vocab = [];

const updatePersonInDatabase = (recordId, fields) => {
  // replace {YOUR_AIRTABLE_ID} with your own.
  const url = `https://api.airtable.com/v0/appgfSt3WTKuHDZ5G/MyDictionary/${recordId}`;

  // replace {YOUR_API_KEY}
  const key = "keyCSCJi3eIDzaqYy";
  const body = { fields: fields };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  fetch(url, options)
    .then(result => result.json())
    .then(result => {
      peopleData = peopleData.map(p =>
        p.recordId === result.id ? { recordId: result.id, ...result.fields } : p
      );
      replaceHTMLCardTemplate();
    });
};

const getData = () => {
  // replace {YOUR_AIRTABLE_ID} with your own.
  const url = "https://api.airtable.com/v0/appgfSt3WTKuHDZ5G/MyDictionary";

  const key = "keyCSCJi3eIDzaqYy";
  const options = {
    headers: {
      Authorization: `Bearer ${key}`
    }
  };

  fetch(url, options)
    .then(result => result.json())
    .then(result => {
      vocab = result.records.map(p => {
        return {
          recordId: p.id, // we need to keep track of the Airtable record ID for future updates
          ...p.fields
        };
      });
      replaceHTMLCardTemplate();
    });
};
getData();

const replaceHTMLCardTemplate = () => {
  let source = document.getElementById("card-template").innerHTML;
  let template = Handlebars.compile(source);
  let context = { vocab: vocab };
  let html = template(context);
  document.getElementById("target").innerHTML = html;
};

replaceHTMLCardTemplate();
