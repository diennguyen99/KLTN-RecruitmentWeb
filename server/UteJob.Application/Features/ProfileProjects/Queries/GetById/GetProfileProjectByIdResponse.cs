﻿using System;

namespace UteJob.Application.Features.ProfileProjects.Queries.GetById
{
    public class GetProfileProjectByIdResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public string Url { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}
