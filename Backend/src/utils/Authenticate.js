import { ApiError } from "./ApiError.js";
import { load } from "cheerio";
import axios from "axios";

export const isAlumni = async (req, res, next) => {
    const user = req.user;
    if (user && user.role === "ALUMNI") {
        req.user = user;
        next();
    }
    else throw new ApiError(401, "Unauthorized request");
};

export const isStudent = async (req, res, next) => {
    const user = req.user;
    // console.log(user);
    if (user && user.role === "STUDENT") {
        next();
    } else throw new ApiError(401, "Unauthorized request");
};

export const isFaculty = async (req, res, next) => {
    const user = req.user;
    if (user && user.role === "FACULTY") {
        next();
    } else throw new ApiError(401, "Unauthorized request");
};

export const isVerified = async (req, res, next) => {
    const user = req.user;
    if (user && user.isVerified) {
        next();
    } else throw new ApiError(401, "User not verified");
};

export const isPermited = async (req, res, next) => {
    const user = req.user;
    if (user && (user.role === "FACULTY" || user.role === "ALUMNI")) {
        next();
    } else throw new ApiError(401, "User not permited");
};

export const userDetails = async (id) => {
    console.log(studentId);
    try {
        const options = {
            method: "POST",
            url: "https://charusat.edu.in:912/FeesPaymentApp/frmFeesPayment.aspx",
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data: {
                __VIEWSTATE:
                    "/wEPDwUKMTYwNDQ4ODc1MQ8WAh4MUHJldmlvdXNQYWdlBT5odHRwczovL2NoYXJ1c2F0LmVkdS5pbjo5MTIvRmVlc1BheW1lbnRBcHAvZnJtRmVlc1BheW1lbnQuYXNweBYCAgMPZBYCAgMPZBYCZg9kFgICAQ9kFgRmD2QWBAIBDw8WAh4HVmlzaWJsZWdkZAIXD2QWCgIBDw8WAh4EVGV4dGVkZAIDDw8WAh8CZWRkAgUPDxYCHwJlZGQCDQ8QZGQWAGQCDw9kFhoCAQ8WAh4FVmFsdWVlZAIDDxYCHwNlZAIFDxYCHwNlZAIHDxYCHwNlZAIJDzwrAA0BAA8WBB4LXyFEYXRhQm91bmRnHgtfIUl0ZW1Db3VudGZkZAILDzwrAAkBAA8WBB4IRGF0YUtleXMWAB8FAv////8PZGQCDQ8WAh4JaW5uZXJodG1sBQ9GZWVzIHRvIGJlIFBhaWRkAg8PDxYEHwJlHwFoZGQCEQ9kFgICAQ8PFgQfAmUfAWhkZAITD2QWAgIBDw8WAh8CZWRkAhUPDxYCHwFoZGQCFw8QDxYCHwFoZGQWAGQCGQ8PFgIfAWhkZAIBD2QWEgIHDw8WAh8CZWRkAgkPDxYCHwJlZGQCDQ8PFgIfAmVkZAIRD2QWAgIBDw8WAh8CZWRkAhMPDxYCHwJlZGQCFQ8PFgIfAmVkZAIXDw8WAh8CZWRkAhkPDxYCHwJlZGQCGw9kFgICAQ8PFgIfAmVkZBgCBQZtdlBhZ2UPD2RmZAUMZ3ZQZW5kaW5nZmVlDzwrAAoBCGZksLNTv8oXnEvqMbz5XPh3IsqW/B0=",
                txtStudentID: id,
                btnSearch: "Search",
            },
            timeout: 10000,
        };

        const response = await axios.request(options);
        const $ = load(response.data);
        const studentName = $("#lblStudentName").text();
        const institute = $("#lblInstitute").text();
        const degree = $("#lblDegree").text();
        const semester = $("#lblCurrSemester").text();
        if (studentName === "") return generateName();
        let fName = studentName.split(" ")[1].toLowerCase();
        fName = fName.charAt(0).toUpperCase() + fName.slice(1);
        let lName = studentName.split(" ")[0].toLowerCase();
        lName = lName.charAt(0).toUpperCase() + lName.slice(1);
        return {
            fName: fName,
            lName: lName,
            institute: institute,
            degree: degree,
            semester: semester,
        };
    } catch (error) {
        console.error("Error in getUserByRollNo:", error.message);
        throw new Error("Failed to fetch user details.");
    }
};
