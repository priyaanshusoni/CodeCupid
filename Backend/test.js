const dummyData = {
    id: 1,
    //1. This is How every() function works in Javascript
    
    name: "John Doe",
    username: "johndev123",
    email: "john.doe@example.com",
    isActive: true,
    profile: {
      bio: "Full-stack developer and tech enthusiast.",
      skills: ["JavaScript", "React", "Node.js", "CSS"],
      experience: [
        {
          company: "TechCorp",
          role: "Frontend Developer",
          years: 2,
        },
        {
          company: "CodeHub",
          role: "Backend Developer",
          years: 1,
        },
      ],
    },
   
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2025-01-22T15:30:00Z",
  };
  





    const ALLOWED_UPDATES = [
        'id',        'name',
  'username',  'email',
  'isActive',  'profile',
  'createdAt', 'updatedAt'
     ]

     function a(x){
       return   ALLOWED_UPDATES.includes(x)
     }


     let keyArray = Object.keys(dummyData);

     console.log(keyArray.every((x)=>ALLOWED_UPDATES.includes(x)));



 
