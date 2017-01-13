// BUGS: it doesn't update dynamically... requires to click.


(function() {
    'use strict';
    angular.module('app', [])
        .component('reddit', {
            controller: function() {
                const vm = this;
                vm.$onInit = function() {
                    vm.showPost = true;
                    vm.sortBy = "date";
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
                
                // $scope.reverse = true;
                //     $scope.sortBy = function(postOrder) {
                //         $scope.reverse = ($scope.postOrder === postOrder) ? !$scope.reverse : false;
                //         $scope.postOrder = postOrder;
                //     };

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

                vm.sortingHat = function() {

                }

                vm.byScore = function() {
                    vm.posts.sort(function(a, b) {
                        return parseFloat(a.score) - parseFloat(b.score);
                    });
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
                            if (diffHrs > 0) {
                                vm.posts[i].timePassed = diffHrs + " hours ago."
                            }
                            if (diffMins > 1) {
                                vm.posts[i].timePassed = diffMins + " minutes ago."
                            }
                            if (diffMins < 1) {
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
                    vm.post.comments = [];
                    vm.post.showComments = true;
                    vm.posts.push(vm.post);
                    delete vm.post;
                };
                vm.addComment = function(post) {
                    vm.posts[vm.posts.indexOf(post)].comments.push(post.tempComment);
                    delete post.tempComment;
                }

                // TODO Delete a post.
                vm.deletePost = function(e, post) {
                    console.log("Post Deleted.")
                    e.preventDefault();
                    vm.posts.splice(vm.posts.indexOf(post), 1);
                };
            },
            templateUrl: "./reddit.html"
        });

}());
