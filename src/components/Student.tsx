import StudentType from "../types/StudentType"

function Student(props: StudentType){
    return(
      <div>
        <h1>Student Name : <span>{props.name}</span></h1>
        <p> Student Age : <span>{props.age}</span></p>
      </div>
    )
  }

  export default Student;
  