require 'dimensions'

Maid.rules do
  rule 'Sort Camera Uploads in Dropbox into appropriate folders' do
    camera_uploads = "~/Dropbox (Personal)/Camera Uploads"
    files(File.join(camera_uploads, "*")).each do |path|
      if media_type(path) == "image"
        filename = File.basename(path)
        if [[640, 1136], [1136, 640]].include? Dimensions.dimensions(path)
          new_path = File.join(camera_uploads, "Screenshots", filename)
          rename(path, new_path)
        else
          year_folder  = modified_at(path).year.to_s
          month_folder = modified_at(path).strftime("%m-%b")
          new_path     = File.join(camera_uploads, year_folder, month_folder, filename)
          rename(path, new_path)
        end
      end
    end
  end
end
