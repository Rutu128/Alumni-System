import AlumniDataStructure from "./AlumniDataStructure";
import FacultyDataStructure from "./FacultyDataStructure";
import StudentDataStructure from "./StudentDataStructure";

export default function getData(role){
    if(role === "STUDENT"){
        return StudentDataStructure;
    }
    if(role === "FACULTY"){
        return FacultyDataStructure;
    }
    if(role === "ALUMNI"){
        return AlumniDataStructure;
    }
}