/**
 * ファイルを分割する
 * @param {Blob} target 分割するファイル。
 * @return {Blob[]} 分割後のファイル。
 */
function slice_file(target) {
	/**
	 * @type {Blob[]}
	 */
	var res = [];
	const SegSize = 25 * (1 << 20)
	for (var i = 0; i * SegSize < target.size; i++) {
		res.push(target.slice(i * SegSize, Math.min((i + 1) * SegSize, target.size)))
	}
	return res;
}
/**
 * ファイルを結合する
 * @param {Blob[]} segments 分割されたファイル。
 * @return {Blob} 元のファイル。
 */
function join_file(segments) {
	return new Blob(segments);
}
export async function onRequestGet(context) {
	/**
	* @type {Object<string, number>}
	*/
	const index = JSON.parse(await context.env.ASSETS.fetch("/index.json"));
	/**
	 * @type {string}
	 */
	const file_name = context.params.file_name;
	if (!index.hasOwnProperty(file_name)) {
		return new Response(null, { status: 404 });
	}
	return await Promise.all(
		[...Array(index[file_name])]
			.map((_, i) => context.env.ASSETS.fetch(`/binary/${fname}_segment_${i}.bin`)
				.then(
					(v) => v.blob()
				)
			)
	).then(
		args=>new Response(join_file(args))
	);
}