import React from 'react';
import { useState } from 'react';

//to take in user input & set values on change
const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const ConfigForm = () => {
  // defining frequencies drop down options 
  const freqOptions = ['Select', '10S', '1M', '5M', '15M', '30M', '1H', '2H', '3H']


  const [appName, setAppName] = useInput('');
  const [funcName, setFuncName] = useInput('');
  const [url, setUrl] = useInput('');
  const [invRate, setInvRate] = useInput('');
  const [warmerOn, setWarmerOn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  //on submit, send form data to server
  const handleSubmit = (e) => {
    console.log("rate", invRate)
    e.preventDefault();
    if (!invRate || invRate === 'Select' || !appName || !funcName || !url || !warmerOn) {
      setSuccessMessage('Please fill in all required feilds')

    }
    else {
      //form body to send to server
    const body = {
      appName: appName,
      funcName: funcName,
      funcUrl: url,
      funcFreq: invRate,
      warmerOn: warmerOn ? 'Yes' : 'No',
      //stretch: add userId field for auth
    };

    fetch('/api/config/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage('Function successfully added!'); //set success message on successful post
      })
      .catch((err) => {
        console.log(' add func fetch api/config/new: ERROR: ', err);
        setSuccessMessage(''); //reset the success message on error
      });

    }
    
  };

  return (
    <div className="config-form">
      <form onSubmit={handleSubmit}>
        <div className="name-fields">
          <div>
            <label for="appName">App name: </label>
            <input
              placeholder='Enter app name (e.g. "MyApp")'
              type="text"
              id="appName"
              name="appName"
              value={appName}
              onChange={setAppName}
            />
          </div>
          <div>
            <label htmlFor="funcname"> Function name: </label>
            <input
              placeholder='Enter function name (e.g. "sendEmail")'
              type="text"
              id="funcname"
              name="funcname"
              value={funcName}
              onChange={setFuncName}
            />
          </div>
        </div>
        <br></br>
        <div className="url-div">
          <label for="url">Function URL: </label> <br></br>
          <input
            placeholder="Enter function URL"
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={setUrl}
          />
        </div>
        <br></br>
        <div className="invRate-warmer-div">
          <label htmlFor="invRate">Invocation rate: </label>
          <select
            id="invRate"
            name="invRate"
            value={invRate}
            onChange={setInvRate}
          >
            {freqOptions.map((frequency) => (
                    <option value={frequency}>{frequency}</option>))
                    }
          </select>
          <div className="warmer">
            <label class="switch">
              Warmer on:
              <input
                type="checkbox"
                checked={warmerOn}
                onChange={(e) => setWarmerOn(e.target.checked)}
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <br></br>
        <button type="submit">Save</button>
        {successMessage && <span>{successMessage}</span>}
      </form>
    </div>
  );
};

export default ConfigForm;
