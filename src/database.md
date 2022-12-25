collection : posts 
# Post
Add new post 
id 
title 
slug
image
createAt
status : 1(approved) 2(pending) 3(reject)
content: html nhưng convert sang json string rồi đưa ra ngoài parse ra html
userId
categoryId

# Category 
id 
title 
slug
status : 1 approved 2 pending 

# User 
id 
displayName 
email 
password
status : 1(active) 2(pending) 3(ban)
role : 1(admin) 2(mod) 3(user)
( permission : rất phức tạp, là 1 cái array - có rất nhiều permission trong này "ADD_POST" là 1 ví dụ)
createAt: 
avatar :