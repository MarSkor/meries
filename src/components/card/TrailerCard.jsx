import React from 'react'
import YouTube from 'react-youtube';
import { Button } from "../index";

const TrailerCard = ({ trailer, onClose }) => {

    //if the trailer array have any objects with the name "official trailers" filter them out.
    const trailerToPlay = trailer.results?.filter(vid => vid.name.includes("Official Trailer"))

    return (
    <>
    <div onClick={onClose} />
        <div className="trailer-modal">
            {trailer ? (
            <YouTube
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                //play the first video in the "trailerToPlay array"
                videoId={trailerToPlay[0].key}
                className={"youtube-container"}      
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        controls: 1,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                    },
                }}
            />
            ) : (
                <p>No trailer found.</p>
            )}

            <Button
            className="youtube-close"
            onClick={onClose}
            >
            Close
            </Button>
        </div>
    </>
  )
}

export default TrailerCard