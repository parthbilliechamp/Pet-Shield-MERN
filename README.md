# Project Proposal 

* *Date Created*: 01 Feb 2023
* *Last Modification Date*: 26 Feb 2023
* *Git URL (main branch)*: https://git.cs.dal.ca/ppc/group_5_csci5709
* *Git URL (branch)*: 


## Authors

* [Shivangkumar Gandhi (B00916876)](sh966188@dal.ca)
* [Jaivik Tailor (B00915987)](jv711224@dal.ca)
* [Parth Champaneria (B00918132)](pr514457@dal.ca)
* [Utsav Singh (B00923487)](ut796069@dal.ca) 
* [Abhinav Singh (B00915090](abhinav.singh@dal.ca) 

## Getting Started

### Prerequisites

To have a local copy of this lab / assingnment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins


#### Dependencies Required:

```
npm install material-ui
npm install @material-ui/core
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-date-pickers
npm install react-hook-form
```


See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running


```
npm install 
npm run build
npm start
```

After these commands the app is launched on the localhost.
Following can be seen in the terminal: 

> Compiled successfully!

> You can now view add_medical_records_task in the browser.

>  Local:            http://localhost:3000
>  On Your Network:  http://192.168.137.1:3000

>Note that the development build is not optimized.
>To create a production build, use npm run build.

>webpack compiled successfully



## Deployment

Add additional notes about how to deploy this on a live system

- Create a repository named 'csci5709' on github or gitlab
- Push the code into the repository
- Create a netlify account
- Deploy project with github/gitlab option
- Configure Deployment settings

URL: https://spontaneous-blancmange-9e6574.netlify.app/ 


## Built With

* [React JS](https://reactjs.org/docs/getting-started.html) - The web framework used
- [NPM](https://www.npmjs.com/) - The package manager for [Node](https://nodejs.org/)
- [Material UI](https://mui.com/) - An open-source React component library
- [Visual Studio Code](https://code.visualstudio.com/download) - source code editor 
- [Google Chrome](https://www.google.com/intl/en_in/chrome/) - Browser used to visualize the changes
- [Netlify](https://app.netlify.com/) - used for deployment of application.



## Sources Used

### AddMedicalRecord.js

*Lines 188 - 191*

```
pattern: {
    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Invalid Email"
}
```

The code above was created by adapting the code in [html5-tutorial](https://html5-tutorial.net/form-validation/validating-email/) as shown below: 

```
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
```

- <!---How---> The code in [html5-tutorial](https://html5-tutorial.net/form-validation/validating-email/) was implemented by Shivang for validating the input email address to match the following REGEX
- <!---Why---> [html5-tutorial](https://html5-tutorial.net/form-validation/validating-email/)'s Code was used because REGEX are already defined to validate particular patterns.
- <!---How---> [html5-tutorial](https://html5-tutorial.net/form-validation/validating-email/)'s Code was modified by using it in the required conditions which were not mentioned on the source side.


Shivang used 2 images for HomePage.js

```
import vetImg from '../Assets/vet.png'
import dogImg from '../Assets/dog.png'
```

Shivang used images from [Freepik](https://www.freepik.com/)

vetImg: "https://img.freepik.com/free-photo/party-dog_23-2147787331.jpg?w=1380&t=st=1677335551~exp=1677336151~hmac=9ad7a3cd934e49b805c7b249dc17c72cc0847d9521047b0f55c557eccbcff76b"
dogImg: "https://img.freepik.com/free-photo/front-view-female-veterinarian-observing-little-dog-yellow-wall_179666-12493.jpg?w=996&t=st=1677334847~exp=1677335447~hmac=0be9f092d370e154f3f0952915ffaa745bf16bd7bc8aff9088b796c5ecfa5b47"



Shivang used Material UI library as I used React JS, adapting the code in [Material UI](https://mui.com/material-ui/) the official website for documentation as shown below: 


- <!---How---> The code in [Material UI](https://mui.com/material-ui/) was implemented by Shivang by rendering inbuilt components like Grid, TextField, Buttons, etc. and their attributes and syntaxes.
- <!---Why---> [Material UI](https://mui.com/material-ui/)'s components was used because they are universal and used in mostly every React JS projects.
- <!---How---> [Material UI](https://mui.com/material-ui/)'s Code was modified by changing the properties and also the logic behind the rendering of components and validation techniques. They are just the UI components like Texfield, Button, Container, etc.


## Acknowledgments

* [Material UI](https://mui.com/material-ui/) for providing useful and handy render components for react js
* [React JS](https://reactjs.org/) Framework for documentation.
* [Freepik](https://www.freepik.com/) For Images