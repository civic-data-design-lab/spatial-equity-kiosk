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
        src="https://www.youtube.com/embed/tSGOYpNTc8k"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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
