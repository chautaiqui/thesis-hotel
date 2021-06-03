// import React from "react";
// import { Row, Col, Card, Button } from "antd";

// export const Blogs = (props) => {
//   const { blog, search } = props;
//   console.log(blog);
//   return (
//     <>
//       {blog.length !== 0 && (
//         <div style={{ marginTop: 20 }}>
//           <Button>More</Button>
//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//               <Card
//                 cover={
//                   <img
//                     alt="example"
//                     src={
//                       blog[0].img || "https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
                      
//                     }
//                   />
//                 }
//                 style={{ padding: 5, cursor: "pointer" }}
//                 onClick={() => {
//                   search(`/blog?id=${blog[0]._id}`);
//                 }}
//               >
//                 <Card.Meta title={blog[0].title} />
//               </Card>
//             </Col>
//             <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//               <Row gutter={[16, 16]}>
//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                   <Card
//                     cover={
//                       <img
//                         alt="example"
//                         src={
//                           blog[1].img || "https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
                          
//                         }
//                       />
//                     }
//                     style={{ padding: 5, cursor: "pointer" }}
//                     onClick={() => {
//                       search(`/blog?id=${blog[1]._id}`);
//                     }}
//                   >
//                     <Card.Meta title={blog[1].title} />
//                   </Card>
//                 </Col>
//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                   <Card
//                     cover={
//                       <img
//                         alt="example"
//                         src={
//                           blog[2].img || "https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
                          
//                         }
//                       />
//                     }
//                     style={{ padding: 5, cursor: "pointer" }}
//                     onClick={() => {
//                       search(`/blog?id=${blog[2]._id}`);
//                     }}
//                   >
//                     <Card.Meta title={blog[2].title} />
//                   </Card>
//                 </Col>
//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                   <Card
//                     cover={
//                       <img
//                         alt="example"
//                         src={
//                           blog[3].img || "https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
                          
//                         }
//                       />
//                     }
//                     style={{ padding: 5, cursor: "pointer" }}
//                     onClick={() => {
//                       search(`/blog?id=${blog[3]._id}`);
//                     }}
//                   >
//                     <Card.Meta title={blog[3].title} />
//                   </Card>
//                 </Col>
//                 <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                   <Card
//                     cover={
//                       <img
//                         alt="example"
//                         src={
//                           blog[4].img ||"https://res.cloudinary.com/hotellv/image/upload/v1620922817/q84uupghxhgbau5wk542.jpg"
//                         }
//                       />
//                     }
//                     style={{ padding: 5, cursor: "pointer" }}
//                     onClick={() => {
//                       search(`/blog?id=${blog[4]._id}`);
//                     }}
//                   >
//                     <Card.Meta title={blog[4].title} />
//                   </Card>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </div>
//       )}
//     </>
//   );
// };
