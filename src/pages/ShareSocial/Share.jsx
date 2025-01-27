import React from 'react'
import {
    EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
  
  } from "react-share";
  import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';


export default function Share() {
    const shareUrl = window.location.href
   

    const copyToClipboard = () => {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          console.log('URL copied to clipboard:', shareUrl);
          // You can add additional actions here, like displaying a success message
        })
        .catch((error) => {
          console.error('Failed to copy URL to clipboard:', error);
          // You can add handling for errors here
        });
    };
  return (
   <>
   <div className="Demo__container w-[100%] flex justify-center items-center flex-wrap">
   <div className="Demo__some-network">
   <div className=" rounded-[50%] h-[50px] flex items-center justify-center w-[50px] bg-slate-500 " onClick={copyToClipboard}>
   <ContentCopyRoundedIcon
   style={{color:"white",fontSize:"30px"}}
     url={shareUrl}
   
     body="body"
     className="Demo__some-network__share-button"
   >
     <ContentCopyRoundedIcon style={{color:"white"}} size={50} round />

   </ContentCopyRoundedIcon>
   </div>
 </div>
  
  

   
   
   <div className="Demo__some-network">
     <WhatsappShareButton
       url={shareUrl}
       
       separator=":: "
       className="Demo__some-network__share-button"
     >
       <WhatsappIcon size={50} round />
     </WhatsappShareButton>
   </div>
 </div>
   </>
  )
}
