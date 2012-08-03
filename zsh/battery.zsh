function battery_set_no_battery_present_prompt
{
    error_msg='no battery'
    function battery_pct_remaining() { echo $error_msg }
    function battery_time_remaining() { echo $error_msg }
    function battery_pct_prompt() { echo '' }
}

function battery_present_prompt_common
{
    function battery_pct_prompt() {
        b=$(battery_pct_remaining)
        if [ $b -gt 50 ] ; then
            color='green'
        elif [ $b -gt 20 ] ; then
            color='yellow'
        else
            color='red'
        fi
        echo "%{$fg[$color]%}[$(battery_pct_remaining)%%]%{$reset_color%}"
    }
}

case `uname -s` in
    Linux)
        if [[ $(acpi 2&>/dev/null | grep -c '^Battery.*Discharging') -gt 0 ]] ; then
            function battery_pct_remaining() { echo "$(acpi | cut -f2 -d ',' | tr -cd '[:digit:]')" }
            function battery_time_remaining() { echo $(acpi | cut -f3 -d ',') }
            battery_present_prompt_common
        else
            battery_set_no_battery_present_prompt
        fi
        ;;
    Darwin)
        if [ $(pmset -g batt | grep -c InternalBatt) -gt 0 ]; then
            # using pmset for this, maybe there is a more intelligent way, but this works
            function battery_pct_remaining() { echo "${$(LANG=C pmset -g batt | grep InternalBattery | cut -d'%' -f 1)##*[\!0-9]}"}
            function battery_time_remaining() { echo $(LANG=C pmset -g batt | grep InternalBattery | cut -d';' -f 3 | cut -d' ' -f2) }

            # if this is needed in the future
            function battery_ac_present() { echo $(LANG=C pmset -g ac | grep -c "No adapter attached")}

            battery_present_prompt_common
        else
            battery_set_no_battery_present_prompt
        fi
        ;;
    *)
        echo "Your system is not yet supported by the plugin battery."
        echo "Please disable this plugin"
        ;;
esac