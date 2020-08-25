const adminResolvers = require('./adminResolvers');
const teacheResolvers = require('./teacherResolvers');
const groupResolvers = require('./groupResolvers');
const courseResolvers = require('./courseResolvers');
const detailResolvers = require('./detailResolvers');
const pathResolvers = require('./pathResolvers');
const pathCourseResolver = require('./pathCourseResolvers');
const studentResolvers = require('./studentResolvers');
const prefactorResolvers = require('./prefactorResolvers');
const registerdCourseResolvers = require('./registerdCourseResolvers');
const momentsResolvers = require('./momentsResolvers');
const teacherGalleryResolvers = require('./teacherGalleryResolvers');
const courseGalleryResolvers = require('./courseGalleryResolvers');
const reserveResolvers = require('./reserveResolvers');


module.exports = {
    Query:{
        ...adminResolvers.Query,
        ...teacheResolvers.Query,
        ...groupResolvers.Query,
        ...courseResolvers.Query,
        ...detailResolvers.Query,
        ...pathResolvers.Query,
        ...pathCourseResolver.Query,
        ...studentResolvers.Query,
        ...prefactorResolvers.Query,
        ...registerdCourseResolvers.Query,
        ...momentsResolvers.Query,
        ...teacherGalleryResolvers.Query,
        ...courseGalleryResolvers.Query,
        ...reserveResolvers.Query
    },
    Mutation:{
        ...adminResolvers.Mutation,
        ...teacheResolvers.Mutation,
        ...groupResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...detailResolvers.Mutation,
        ...pathResolvers.Mutation,
        ...pathCourseResolver.Mutation ,
        ...studentResolvers.Mutation,
        ...prefactorResolvers.Mutation,
        ...registerdCourseResolvers.Mutation,
        ...momentsResolvers.Mutation,
        ...teacherGalleryResolvers.Mutation,
        ...courseGalleryResolvers.Mutation,
        ...reserveResolvers.Mutation
    }
}