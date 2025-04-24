import { getAccessCode } from "./init-bigin";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

/* Emails from inbox
Hi Lars,

It's nice to "meet" you! I've dropped Dan from cc to save his inbox. 

As Dan mentioned, I live in La Grange and we worked together for several years; Dan and I were the original hires to open to the Chicago Jabian Consulting office. I had spent my career in consulting and last year decided to venture out towards some areas of personal passion - bringing more STEM education opportunities to kids in our community! I have two elementary aged kids and my husband and I wanted to see more offering in our community to bring STEM topics to them in a fun and engaging way. 

I would love to deliver programming in Hinsdale and I am looking for a partner from whom I can rent a room to host classes. My near term goal is to secure space for summer camps. We generally run 3-hour camps (9am-12pm or 1-4pm) 5 days a week. Our camps are centered on a theme and each robotic build (or coding project) is based on that theme, such as Battle Robots, Expedition Mars, Amusement Park Tycoon, or Intro to Video Game Design (coding). Our needs for rental space is a room with a capacity of up to 20, with tables and chairs. We bring all the equipment (robotics kits or coding laptops) in and we don't do anything that creates a "mess". 

We are currently partnering with First United Methodist Church in La Grange, Park District of La Grange, Clarendon Hills Park District, and more! We are also participating in the District 181 Foundation's Summer Camp Expo tomorrow (at Hinsdale Middle School). While Clarendon Hills Park District is close for Hinsdale, I would love to make our program even more accessible to the Hinsdale community by being in the heart of Hinsdale. 

We are fully insured and can provide you with a Certificate of Insurance.

Would you be open to renting space to us for summer camps this summer? I'd be happy to come by and talk with you more! I have availability today, Wed and Thurs until 3pm each day. Please let me know if something in there could work for us to discuss more.

Thank you for your time,
Stephanie Noland
Managing Owner  

RoboThink Chicagoland
708-910-7663

Hey Lars,

I hope all is well.  My Thursday mornings have been crazy to start the new year, so I was not able to make it to too many of the winter MF sessions, but sounds like there were some good ones and the attendance seems to keep growing which is awesome.

 I wanted to introduce you to my good friend and former colleague, Stephanie Noland, who is the franchise owner of RoboThink Chicagoland. RoboThink is an innovative STEM education program that offers robotics and coding classes for students in grades K-6. Their mission is to inspire the next generation of engineers, programmers, and innovators.

Stephanie is passionate about bringing RoboThink’s hands-on learning experiences to our community and is exploring partnerships with local churches and parish schools. They are a remote business and deliver their programming through schools (public and private), park districts, churches and more. They would be looking to rent space to host classes for the community and/or offer programming exclusive to your congregation (they even have RoboThink Jr for late age preschoolers-Kindergarten).  

Stephanie lives in LaGrange and asked if I had connections to any of the churches in Hinsdale, so though of you.  I am confident that Stephanie would be a fantastic partner to work with if something like this makes sense for Covenant. Please feel free to reach out to her directly at chicagoland@myrobothink.com or 708-910-7663 to discuss this opportunity further.

Good Morning, 

I am writing to share information about our exciting  *newly launched* STEM program called RoboThink. We are newly launched in this area as of this May but are a leading STEM Education program worldwide. 

We are looking to partner with Park Districts like you to offer after school programming, camps, and workshops.

We'd love to welcome children to the captivating world of STEM Robotics!  RoboThink students will have the opportunity to dive headfirst into the realms of science, technology, engineering, and mathematics. With gears, motors, axles, and batteries at their disposal, they'll bring their own simple machines to life and witness the power of hands-on learning. No prior experience necessary– students just need enthusiasm and to be prepared for an experience that combines creativity, problem-solving, and pure fun!

To make it even easier on you, we bring the teachers, the materials, the curriculum, and all the hardware necessary to run our range of STEM programs. All we need from you is classroom space!

I’ve attached a program proposal for your review and would love to set up a time to meet in person. 

We look forward to future conversations about partnership!

Best,

Cara Ross - Assistant Manager
Stephanie Noland - Owning Manager 
RoboThink West Chicago
708-910-7663

RoboThink Chicagoland
708-910-7663

Good Morning, 


 


I am writing to share information about our exciting  *newly launched* STEM program called RoboThink. We are newly launched in this area as of this May but are a leading STEM Education program worldwide. 


 


We are looking to partner with Park Districts like you to offer after school programming, camps, and workshops.


 


We'd love to welcome children to the captivating world of STEM Robotics!  RoboThink students will have the opportunity to dive headfirst into the realms of science, technology, engineering, and mathematics. With gears, motors, axles, and batteries at their disposal, they'll bring their own simple machines to life and witness the power of hands-on learning. No prior experience necessary– students just need enthusiasm and to be prepared for an experience that combines creativity, problem-solving, and pure fun!


 


To make it even easier on you, we bring the teachers, the materials, the curriculum, and all the hardware necessary to run our range of STEM programs. All we need from you is classroom space!


 


I’ve attached a program proposal for your review and would love to set up a time to meet in person. 


 


We look forward to future conversations about partnership!


 


Best,


 


Cara Ross - Assistant Manager


Stephanie Noland - Owning Manager 


 


RoboThink West Chicago


708-910-7663




RoboThink Chicagoland

708-910-7663


*/

function generateEmailBody(recipient: string, organization: string): string {
  const body = `Hello ${recipient},
  
  I'm Jamal, the Partnerships Manager at RoboThink Chicagoland and I hope this email finds you well! RoboThink is a STEM franchise that offers coding and robotics programs to school-aged students. We're looking for schools to connect and partner with for any STEM-related events you may have in the future, but to show you what we're all about, I'd love to connect with you further first and show you first-hand what we have to offer. Please let me know when would be a good time for us to connect further, and I look forward to hearing from you soon!
  
  Best,
  Jamal`;

  return body;
}

async function sendEmail() {
  // Fetch the access code from Bigin.
  const accessCode = await getAccessCode().then((res) => {
    return res;
  });

  const { error, access_token } = accessCode;

  // // Throw an error if the code is invalid.
  if (error || !access_token) throw new Error(error);

  // Read and parse through the list of schools.

  type Partner = {
    fullName: string;
    shorthandName: string;
    type: string;
    pocFullName: string;
    pocNickname: string;
    pocEmail: string;
    city: string;
    exclude: string;
  };

  const csvFilePath = path.resolve(__dirname, "files/potential-partners.csv");
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const headers = [
    "fullName",
    "shorthandName",
    "type",
    "pocFullName",
    "pocNickname",
    "pocEmail",
    "city",
    "exclude",
  ];

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
    },
    (error, result: Partner[]) => {
      if (error) console.error(error);

      // Filter out the header row and any partner missing and email.
      const potentialPartners = result.filter(
        (datum, i) => i !== 0 && datum.pocEmail !== ""
      );

      // Send an email to each potential partner.
      for (const partner of potentialPartners) {
        const { pocNickname, shorthandName } = partner;
        const body = generateEmailBody(pocNickname, shorthandName);
        console.log(body);
        console.log("—————————————————————————");
      }
    }
  );
}

sendEmail();
