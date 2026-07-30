import { useRef } from "react";

function Learn3() {
	const sectionRef = useRef<null | HTMLDivElement>(null);

	function showSection() {
		if (sectionRef) sectionRef.current!.style.transform = `translateY(-75%)`;
	}

	function hideSection() {
		if (sectionRef) sectionRef.current!.style.transform = ``;
	}

	return (
		<div
			onMouseOver={showSection}
			onMouseOut={hideSection}
			className="bg-container3"
		>
			<div ref={sectionRef} className="bg-container3-inner">
				<h2>This is how you deal with stress based on your personality type</h2>
				<p>
					Everybody has their own method of dealing with stress. Some like to
					pray and meditate, some throw things around the room, and others swallow their
					discomfort down and hope that it will fix itself. Having the wisdom
                    to manage stress is fundamental for human wellbeing. Your personality profile will
                     show what calms you down when there is chaos around. Take the test and see.
		
				</p>
			</div>
		</div>
	);
}

export default Learn3;
