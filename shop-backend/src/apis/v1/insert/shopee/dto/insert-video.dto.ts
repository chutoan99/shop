import { InsertBaseDto } from '../base-insert.dto'
import { formatDateV2 } from '@helpers/date.helper'
import { Expose, plainToInstance } from 'class-transformer'

export class InsertVideoDto extends InsertBaseDto {
	@Expose()
	id!: string

	@Expose()
	thumb_url?: string | null

	@Expose()
	duration?: number | null

	@Expose()
	version?: number | null

	@Expose()
	width?: number | null

	@Expose()
	height?: number | null

	@Expose()
	defn?: string | null

	@Expose()
	profile?: string | null

	@Expose()
	url?: string | null

	static fromJson(jsonData: any): InsertVideoDto {
		return plainToInstance(InsertVideoDto, {
			id: jsonData?.video_info_list[0]?.video_id,
			thumb_url: jsonData?.video_info_list[0]?.thumb_url,
			duration: jsonData?.video_info_list[0]?.duration,
			version: jsonData?.video_info_list[0]?.version,
			defn: jsonData?.video_info_list[0]?.default_format?.defn,
			profile: jsonData?.video_info_list[0]?.default_format?.profile,
			url: jsonData?.video_info_list[0]?.default_format?.url,
			width: jsonData?.video_info_list[0]?.default_format?.width,
			height: jsonData?.video_info_list[0]?.default_format?.height,
			created_at: formatDateV2(jsonData?.ctime),
			updated_at: formatDateV2(jsonData?.ctime)
		})
	}
}
