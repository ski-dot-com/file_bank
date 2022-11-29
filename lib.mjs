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
	for (var i = 0; i * 2.5e+7 < target.size; i++) {
		res.push(target.slice(i * 2.5e+7, Math.min((i + 1) * 2.5e+7, target.size)))
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
export{
	slice_file,
	join_file
}