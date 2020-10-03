"use strict";

Router.get("/api/ways/:page/:size?", [
    "Way@paginateWay",
]).as("api.way");
