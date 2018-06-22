import React, { Component } from "react";

import "../_styles/Timeline.css";

class Timeline extends Component {
  componentDidMount() {
    window.$(() => {
      let stickyTop = 0;
      let scrollTarget = false;

      let timeline = window.$(".tl");
      let items = window.$("li", timeline);
      let milestones = window.$(".checklist .milestone");
      let offsetTop = parseInt(timeline.css("top"), 10);

      const TIMELINE_VALUES = {
        start: 275,
        step: 30
      };

      window
        .$(window)
        .resize(function() {
          timeline.removeClass("fixed");
          stickyTop = timeline.offset().top - offsetTop;
          window.$(window).trigger("scroll");
        })
        .trigger("resize");

      window
        .$(window)
        .scroll(function() {
          if (window.$(window).scrollTop() > stickyTop) {
            timeline.addClass("fixed");
          } else {
            timeline.removeClass("fixed");
          }
        })
        .trigger("scroll");

      items.find("span").click(function() {
        let li = window.$(this).parent();
        let index = li.index();
        let milestone = milestones.eq(index);

        if (milestone.length) {
          scrollTarget = index;
          let scrollTargetTop = milestone.offset().top - 80;

          // perform the attention-grabbing zoom-in-and-out
          milestone.delay(200).addClass("overhere");
          setTimeout(() => {
            // hacky nonsense to deal with the 'optimisation' of this chain
            milestone.delay(700).removeClass("overhere");
          }, 600);

          window.$("html, body").animate(
            { scrollTop: scrollTargetTop },
            {
              duration: 200,
              complete: function complete() {
                scrollTarget = false;
              }
            }
          );
        }
      });

      window
        .$(window)
        .scroll(function() {
          let viewLine =
            window.$(window).scrollTop() + window.$(window).height() / 4;
          let active = -1;

          if (scrollTarget === false) {
            milestones.each(function() {
              if (window.$(this).offset().top - viewLine > 0) {
                return false;
              }

              active++;
            });
          } else {
            active = scrollTarget;
          }

          timeline.css(
            "top",
            -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + "px"
          );

          items.filter(".active").removeClass("active");

          items.eq(active !== -1 ? active : 0).addClass("active");
        })
        .trigger("scroll");
    });
  }

  render() {
    return (
      <nav className="tl">
        <ul>
          {this.props.items.map((item, key) => (
            <li key={key}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Timeline;
