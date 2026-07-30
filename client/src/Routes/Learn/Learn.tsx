import Learn1 from "./section1";
import Learn2 from "./section2";
import Learn3 from "./section3";
import Learn4 from "./section4";

function Learn() {
	return (
		<>
			<h1 className="learn-header">Learn</h1>
			<div className="learn-container">
				<Learn1 />
				<Learn2 />
			</div>
			<div className="learn-container">
				<Learn3 />
				<Learn4 />
			</div>
		</>
	);
}

export default Learn;
