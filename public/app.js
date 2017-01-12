(function() {
    'use strict';
    angular.module('app', [])
        .component('reddit', {
            controller: function() {
                const vm = this;
                vm.$onInit = function() {
                    vm.showPost = true;

                    // Test post.
                    vm.posts = [{
                        title: "TITLE",
                        author: "AUTHOR",
                        body: "SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT, SAMPLE TEXT",
                        date: new Date(),
                        score: 100,
                        showComments: true,
                        comments: ['FIRST COMMENT', 'SECOND COMMENT']
                    }];
                    console.log('Angular Initialized.');

                    // Check when all posts were created ~60 seconds.
                    (function counter() {
                        vm.checkTime();
                        setTimeout(counter, 60000);
                    })();
                };

                // Toggle the create post menu.
                vm.showPostToggle = function() {
                    if (vm.showPost) {
                        vm.showPost = false;
                        console.log('showPost:', vm.showPost)
                    }
                    else {
                        vm.showPost = true;
                        console.log('showPost:', vm.showPost)
                    }
                }

                // Check the time of when the post is created.
                vm.checkTime = function() {
                    console.log('checkTime Running.');
                    let now = new Date();
                    if (vm.posts != undefined) {
                        for (let i = 0; i < vm.posts.length; i++) {
                            let diffMs = (now - vm.posts[i].date);
                            let diffDays = Math.floor(diffMs / 86400000);
                            let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
                            let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                            if (diffDays > 0) {
                                vm.posts[i].timePassed = diffDays + " days ago.";
                            }
                            if (diffHrs > 1 && diffHrs < 24) {
                                vm.posts[i].timePassed = diffHrs + " hours ago."
                            }
                            if (diffMins > 1 && diffMins < 60) {
                                vm.posts[i].timePassed = diffMins + " minutes ago."
                            }
                            else {
                                vm.posts[i].timePassed = "Recently posted."
                            }
                            console.log("Posted " + i + ": " + diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes.");
                        }
                    }
                    else {
                        console.log("No posts to update.")
                    }
                }

                // Raise and lower scores.
                vm.upScore = function(e, post) {
                    vm.posts[vm.posts.indexOf(post)].score = ++vm.posts[vm.posts.indexOf(post)].score;
                    console.log('upScore: ', vm.posts[vm.posts.indexOf(post)].score);
                }
                vm.downScore = function(e, post) {
                    if (vm.posts[vm.posts.indexOf(post)].score >= 1) {
                        vm.posts[vm.posts.indexOf(post)].score = --vm.posts[vm.posts.indexOf(post)].score;
                    }
                    console.log('downScore: ', vm.posts[vm.posts.indexOf(post)].score);
                }

                // Create a new post.
                vm.addPost = function() {
                    console.log('Post Added.');
                    vm.post.date = new Date();
                    vm.post.timePassed;
                    vm.post.score = 1;
                    vm.comments = [];
                    vm.showComments = true;
                    vm.posts.push(vm.post);
                    delete vm.post;
                };
                vm.addComment = function(post) {
                    vm.posts[vm.posts.indexOf(post)].comments.push(vm.tempComment);
                    delete vm.tempComment;
                }

                // TODO Delete a post.
                vm.deletePost = function(e, post) {
                    console.log("Post Deleted.")
                    e.preventDefault();
                    vm.posts.splice(vm.posts.indexOf(post), 1);
                };
            },
            template: `
 <nav class="navbar navbar-default">
   <div class="container">
      <div class="navbar-header">
         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         </button>
         <a class="navbar-brand">Reddit Clone</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      </div>
   </div>
</nav>
<main class="container">
   <div class="pull-right">
      <p><a class="btn btn-info" ng-click="$ctrl.showPostToggle()">New Post</a></p>
   </div>
   <ul class="nav nav-pills">
      <li role="presentation" class="active">
         <input type="search" class="form-control input-sm search-form" placeholder="Filter">
      </li>
      <li class="dropdown">
         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Some text<span class="caret"></span></a>
         <ul class="dropdown-menu">
            <li><a>Some text</a></li>
         </ul>
      </li>
   </ul>
   <div class="row" ng-show="$ctrl.showPost">
      <div class="col-md-8">
         <form ng-submit="$ctrl.addPost()" name="newPostForm" novalidate>
            <div ng-class="{ 'has-error' : newPostForm.title.$invalid && newPostForm.title.$touched }">
               <label for="title">Title</label>
               <input id="title" class="form-control" ng-model="$ctrl.post.title" name="title" ng-minlength=1 required>
               <small class="error text-warning" ng-show="newPostForm.title.$invalid && newPostForm.title.$touched" >Title is required.</small>

            </div>
            <div ng-class="{ 'has-error' : newPostForm.body.$invalid && newPostForm.body.$touched }">
               <label for="body">Body</label>
               <textarea id="body" class="form-control" ng-model="$ctrl.post.body" name="body" ng-minlength=1 required></textarea>
               <small class="error text-warning" ng-show="newPostForm.body.$invalid && newPostForm.body.$touched" >Body is required.</small>

            </div>
            <div ng-class="{ 'has-error' : newPostForm.author.$invalid && newPostForm.author.$touched }">
               <label for="author">Author</label>
               <input id="author" class="form-control" ng-model="$ctrl.post.author" name="author" ng-minlength=1 required>
               <small class="error text-warning" ng-show="newPostForm.author.$invalid && newPostForm.author.$touched" >Author is required.</small>

            </div>
            <div ng-class="{ 'has-error' : newPostForm.image_url.$invalid && newPostForm.image_url.$touched }">
               <label for="image-url">Image URL</label>
               <input id="image-url" class="form-control" ng-model="$ctrl.post.img_url" type="url" name="image_url" ng-minlength=1 required>
                     <small class="error text-warning" ng-show="newPostForm.image_url.$invalid && newPostForm.image_url.$touched">Must be a valid url.</small>
            </div>
            <div class="form-group">
               <button type="submit" class="btn btn-primary" ng-click=" $ctrl.check()" ng-disabled="newPostForm.$invalid">
               Create Post
               </button>
            </div>
         </form>
      </div>
   </div>
   <div class="row" ng-repeat="post in $ctrl.posts">
      <div class="col-md-12">
         <div class="well">
            <div class="media-left">
               <img class="media-object" src = "{{ post.img_url }}" style="width:244px;" </img>
            </div>
            <div class="media-body">
               <h4 class="media-heading">
                  {{ post.title }} |
                  <a><i ng-click="$ctrl.upScore($event, post);" class="glyphicon glyphicon-arrow-up"></i></a>
                  <a><i ng-click="$ctrl.downScore($event, post);" class="glyphicon glyphicon-arrow-down"></i></a> {{ post.score }}
               </h4>
               <div class="text-right">
                  {{ post.author }}
               </div>
               <p>{{ post.body }}</p>
               <div>
                  {{ post.timePassed }} 
                  <span ng-click="post.showComments = !post.showComments"><i class="glyphicon glyphicon-comment"></i>
                  <a>
                  Some comments
                  </a></span>
               </div>
               <div class="row">
                  <div class="col-md-offset-1" ng-show="post.showComments">
                     <hr>
                     <p ng-repeat=" comment in post.comments ">
                        {{ comment }}
                     </p>
                     <form class="form-inline">
                        <div class="form-group">
                           <input class="form-control" ng-model="$ctrl.tempComment">
                        </div>
                        <div class="form-group">
                           <input type="submit" class="btn btn-primary" ng-click = "$ctrl.addComment(post)">
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</main>
        `
        });

}());
