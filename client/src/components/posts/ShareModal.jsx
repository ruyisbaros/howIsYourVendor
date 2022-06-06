import React from 'react'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon,
} from "react-share"

const ShareModal = ({ url }) => {
    return (
        <div className="d-flex justify-content-around p-4 bg-secondary">
            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon round={true} size={32} />
            </LinkedinShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>
            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
            <RedditShareButton url={url}>
                <RedditIcon round={true} size={32} />
            </RedditShareButton>
        </div>
    )
}

export default ShareModal
