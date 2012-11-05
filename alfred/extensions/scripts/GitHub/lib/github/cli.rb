module GitHub
  class Cli
    attr_accessor :input, :command, :command_value

    def initialize(args)
      @input = args.join(' ')
      @command, @command_value = parse_input(@input)
    end

    def parse_input(string)
      case string
      when /(^\w+$)/
        [:username, $1]
      when /(^\w+\/[\w.-]+$)/
        [:repository, $1]
      when /^\/(.*)/
        [:search, $1]
      else
        [:none]
      end
    end

    def display_usage
      ['github <username>',
       'github <username>/<repository>',
       'github <search_term>'
      ].join("\n")
    end

    def open_in_browser
      `open #{GitHub::URL.new(@command, @command_value).get}`
    end
  end
end
