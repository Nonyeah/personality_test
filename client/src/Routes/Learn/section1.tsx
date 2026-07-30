import { useRef } from "react";

function Learn1() {
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
			className="bg-container1"
		>
			<div ref={sectionRef} className="bg-container1-inner">
				<h2>How understanding your personality type will change your life</h2>
				<p>
					Knowing your personality type is crucial to mastering career and life
					challenges that come your way. To know and utilize your personality
					type can be immensely beneficial to understand your most authentic
					self. If you are yet to take our free personality test, do so now and
					compare your result to the reading below. We're absolutely confident
					that doing so will change your life.
				</p>
			</div>
		</div>
	);
}

export default Learn1;
