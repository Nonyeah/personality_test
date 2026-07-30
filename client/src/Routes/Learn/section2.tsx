import { useRef } from "react";

function Learn2() {
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
			className="bg-container2"
		>
			<div ref={sectionRef} className="bg-container2-inner">
				<h2>Here's why your relationships keep falling apart and you're single</h2>
				<p>
					Nobody enjoys a breakup. It's human nature to undergo a mourning
					period when a relationship ends and question what went wrong. If you
					have a string of broken relationships behind you and you're starting
					to wonder if love and compatiability will ever find you, consider a more relaxed approach. Your
					test reults could provide insight into why you
					haven't yet had your Happy Ever After. 
				</p>
			</div>
		</div>
	);
}

export default Learn2;
