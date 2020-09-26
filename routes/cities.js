"use strict";

Router.get("/api/cities/:page/:size?", [
    "City@paginateCity",
]).as("api.city");
