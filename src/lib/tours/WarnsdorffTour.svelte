<h2 class="mb-3 text-xl font-bold">Warnsdorff's Tour</h2>
<p class="mb-1">
	H.C. Warnsdorff published his heuristic rule for finding knight's tours in 1823. The rule is
	simple: at each step, move the knight to the square from which it will have the fewest onward
	moves. Meaning it will prefer the square with the smallest number of unvisited neighbours
	reachable by a knight's move.
</p>
<p class="mb-1">
	This greedy strategy works remarkably well in practice, typically producing a complete tour on the
	first attempt across boards of any size. The algorithm here uses random tie-breaking when multiple
	candidate squares share the same score, so each run may produce a different valid tour. Try
	different board sizes and starting positions to explore the variety of tours Warnsdorff's rule can
	find.
</p>
