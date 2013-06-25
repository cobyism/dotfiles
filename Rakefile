require 'rake'

# Rakefile thanks to Zach Holman (@holman)
#   https://github.com/holman/dotfiles/blob/master/Rakefile

def link_shit_up(skip_all = false, overwrite_all = false, backup_all = false)
  linkables = Dir.glob('*/**{.symlink}')
  linkables.each do |linkable|
    skip = false
    overwrite = false
    backup = false

    file = linkable.split('/').last.split('.symlink').last
    target = "#{ENV["HOME"]}/.#{file}"

    if File.exists?(target) || File.symlink?(target)
      unless skip_all || overwrite_all || backup_all
        puts "File already exists: #{target}, what do you want to do? [s]kip, [S]kip all, [o]verwrite, [O]verwrite all, [b]ackup, [B]ackup all"
        case STDIN.gets.chomp
        when 'o' then overwrite = true
        when 'b' then backup = true
        when 'O' then overwrite_all = true
        when 'B' then backup_all = true
        when 'S' then skip_all = true
        when 's' then next
        end
      end
      FileUtils.rm_rf(target) if overwrite || overwrite_all
      `mv "$HOME/.#{file}" "$HOME/.#{file}.backup"` if backup || backup_all
      if skip_all
        puts "Skipping #{target} since it exists..."
        skip = true
      end
    end
    `ln -s "$PWD/#{linkable}" "#{target}"` unless skip
  end
end

desc "Dotfiles: battle-stations! Prompt for orders if any already exist."
task :install do
  link_shit_up
end

desc "Dotfiles: stand down!"
task :uninstall do
  Dir.glob('**/*.symlink').each do |linkable|
    file = linkable.split('/').last.split('.symlink').last
    target = "#{ENV["HOME"]}/.#{file}"
    # Remove all symlinks created during installation
    if File.symlink?(target)
      FileUtils.rm(target)
    end
    # Replace any backups made during installation
    if File.exists?("#{ENV["HOME"]}/.#{file}.backup")
      `mv "$HOME/.#{file}.backup" "$HOME/.#{file}"`
    end
  end
end

namespace :install do

  desc "Dotfiles: battle-stations! Skip any files that are already in place."
  task :skip do
    link_shit_up(true, false, false)
  end

  desc "Dotfiles: battle-stations! Overwrite any files that are already in place."
  task :overwrite do
    link_shit_up(false, true, false)
  end

  desc "Dotfiles: battle-stations! Backup any files that are already in place."
  task :backup do
    link_shit_up(false, false, true)
  end
end

task :default => 'install'
