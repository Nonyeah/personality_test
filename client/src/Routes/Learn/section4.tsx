import { useRef } from "react";

function Learn4() {
	const sectionRef = useRef<null | HTMLDivElement>(null);

	function showSection() {
		if (sectionRef) sectionRef.current!.style.transform = `translateY(-65%)`;
	}

	function hideSection() {
		if (sectionRef) sectionRef.current!.style.transform = ``;
	}

	return (
		<div
			onMouseOver={showSection}
			onMouseOut={hideSection}
			className="bg-container4"
		>
			<div ref={sectionRef} className="bg-container4-inner">
				<h2>The top personality traits and skills employers are looking for in 2026 </h2>
				<p>
                    <ol>
					<li>Communication Skills</li>
                    <li>Honesty and accountability</li> 
                    <li>Technical competence</li> 
                    <li>work ethic</li>
                    <li>Flexibility</li>
                    <li>Ability to work in harmony with co workers</li>
                    <li>Problem solivng skills</li>
                     </ol>
				</p>
			</div>
		</div>
	);
}

export default Learn4;
