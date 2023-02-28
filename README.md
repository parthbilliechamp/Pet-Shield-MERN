# Project Proposal 

* *Date Created*: 01 Feb 2023
* *Last Modification Date*: 28 Feb 2023
* *Git URL (main branch)*: https://git.cs.dal.ca/ppc/group_5_csci5709


## Authors

* [Shivangkumar Gandhi (B00916876)](sh966188@dal.ca)
* [Jaivik Tailor (B00915987)](jv711224@dal.ca)
* [Parth Champaneria (B00918132)](pr514457@dal.ca)
* [Utsav Singh (B00923487)](ut796069@dal.ca) 
* [Abhinav Singh (B00915090)](abhinav.singh@dal.ca) 

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
npm i react-chartjs-2 chart.js
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

### To log into the system use the below mentioned credentials

#### Login as Pet Owner:
- email: group5petowner@gmail.com
- Password:Petowner@PetShield
#### Login as veterinarian:
- email: group5vets@gmail.com
- Password:Vets@PetShield


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


You can access the analytics module by visiting http://localhost:3000/analytics. This is because the admin dashboard is still being developed and this is part of the admin module. As a result, we are currently using the analytics module, but in the future, an admin dashboard will be created so that we can view it directly.

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

Parth used images from [Freepik](https://www.freepik.com/)

https://img.freepik.com/free-vector/cardiologist-online-service-platform-idea-heart-care-medical-diagnostic-doctors-treat-heart-disease-online-appointment-flat-vector-illustration_613284-3189.jpg?w=826&t=st=1677532986~exp=1677533586~hmac=2cdb18ad16f9afac761d16c46605666f636abad6317fb599e52673b163f6b07a

https://img.freepik.com/free-vector/poster-pet-insurance-icons_603843-1065.jpg?w=900&t=st=1677532991~exp=1677533591~hmac=d2bf90da55e3f9294485d0bebd7f953721d1f09cc15a99496e47ea4a81fc4196

https://img.freepik.com/premium-vector/choose-doctor-consultation-five-star-rating-medical-staff-reviews-vector-illustration_121070-491.jpg?w=826

### PetOwnerNavbar.js

*Lines 15 - 147*

The AppBar created in this page was modified by refering to https://mui.com/material-ui/react-app-bar/

- <!---Why---> (https://mui.com/material-ui/react-app-bar/)'s code was referenced because it is an open source platfrom that provides way to create NavBar efficiently. 
- <!---How---> (https://mui.com/material-ui/react-app-bar/)'s code was modified by just using the skeleton/structure defined. All the menu items inside the AppBar were individually created.

### VetNavbar.js

*Lines 15 - 147*

The AppBar created in this page was modified by refering to https://mui.com/material-ui/react-app-bar/

- <!---Why---> (https://mui.com/material-ui/react-app-bar/)'s code was referenced because it is an open source platfrom that provides way to create NavBar efficiently. 
- <!---How---> (https://mui.com/material-ui/react-app-bar/)'s code was modified by just using the skeleton/structure defined. All the menu items inside the AppBar were individually created.

### ServiceCards.js

*Lines 9 - 33*

The AppBar created in this page was modified by refering to https://react-bootstrap.github.io/components/cards/

- <!---Why---> (https://react-bootstrap.github.io/components/cards/)'s code was referenced because it is shows how to render text using Bootstrap cards component with React JS
- <!---How---> (https://react-bootstrap.github.io/components/cards/)'s code was modified by just using the skeleton/structure defined. All the content was individually created.

### Appointment.js

*Lines 81 - 100*

The AppBar created in this page was modified by refering to https://react-bootstrap.github.io/components/modal/

- <!---Why---> (https://react-bootstrap.github.io/components/modal/)'s code was referenced because it is shows how to render text using Bootstrap Modal component with React JS
- <!---How---> (https://react-bootstrap.github.io/components/modal/)'s code was modified by just using the skeleton/structure defined. All the content was individually created.

### Star.js

*Lines 3 - 7*

```
const Star = ({ filled }) => (
  <span style={{ color: filled ? '#ffc107' : '#e4e5e9' }}>
    &#9733;
  </span>
);

```

The code above was created by adapting the code in (https://www.toptal.com/designers/htmlarrows/symbols/black-star/) as shown below: 

```
<span>&#9733;</span>

```

- <!---How---> The code was implemented by HTML BY TOPTAL DESIGNERS
- <!---Why---> The code is used to display the star ratings of the vet.
- <!---How---> The code was modified by changing the color of the star. For example, if the rating of the vet is 4, then the first four start would have color as golden.


## Acknowledgments

* [Material UI](https://mui.com/material-ui/) for providing useful and handy render components for react js
* [React JS](https://reactjs.org/) Framework for documentation.
* [Freepik](https://www.freepik.com/) For Images
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Router] (https://reactrouter.com/docs/en/v6/getting-started/overview) - React router is used for page routing in React application.
* [React Datepicker] https://www.npmjs.com/package/react-datepicker - React datepicker is used to develop the time slot booking task.
* [Google Fonts] https://fonts.googleapis.com/css2?family=Merriweather+Sans&family=Roboto+Slab&display=swap - Font used in the navigation bar design.
* [JQuery] https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js

## Other Image References Used for the website development

[1]Vcacanada.com, 2023. https://vcacanada.com/carecentre/-/media/vca-canada/images/hospitals/canada/alberta/carecentre/staff/700x525_care_smith.jpg?h=525&w=700&la=en&hash=DC7893BABD38D9A8AE8518550DC4F393 [Accessed February 06, 2023].
‌
[2]Milduravet.com.au, 2023. https://milduravet.com.au/wp-content/uploads/2022/03/katherine-overs-profile.jpg [Accessed February 06, 2023].

[3]Vcahospitals.com, 2023. https://vcahospitals.com/-/media/2/vca/images/hospitals/united-states/california/marina/staff/700x525_marinaca_blancar.ashx?h=525&iar=0&w=700&hash=2AFBA3F221E1A971519D3368E9DBF492 [Accessed February 06, 2023].

[4]Unsplash.com, 2023. https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fA%3D%3D&w=1000&q=80 [Accessed February 06, 2023].
