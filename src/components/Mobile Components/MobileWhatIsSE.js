/**
 * Simple static component that shows the TA video as well as a brief
 * description of what the project is about.
 *
 */
const MobileWhatIsSE = () => {
  return (
    <div className="mobile-what-is">
      <iframe
        className={'video'}
        src="https://player.vimeo.com/video/764327090?h=daa89e38e4&color=ffffff&title=0&byline=0&portrait=0"
        height="100%"
        frameborder="0"
        controls="0"
        background="true"
      ></iframe>
      <div className="mobile-what-is-description">
        <p>
          Spatial Equity NYC is a project of Transportation Alternatives and the
          Massachusetts Institute of Technology that illustrates the inequities
          that result from the ways that public space in New York City —
          including streets, sidewalks, and greenspaces — is designed,
          distributed, and accessed.
        </p>
      </div>
    </div>
  );
};

export default MobileWhatIsSE;
