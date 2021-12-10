import React, { useState } from 'react';
import cn from 'classnames';

import {
  Button,
  Icon,
  IconButton,
  TagButton,
  Switcher,
  ButtonGroup,
  LabelButton,
  RadioButton,
  Checkbox,
  Spinner,
  TextField,
  IconNamesType,
  Breadcrumbs,
} from 'components/UILib';

import icons from 'icons';

import { useModal } from 'components/Modal/useModal';
import Modal from 'components/Modal';

import { notifications } from '../../components/UILib/notifications/mock';

import { showNotification } from '../../components/UILib/notifications/notificationUtils';

import s from './UILibPage.module.scss';

export interface UILibPageProps {
  className?: string;
}

const UILibPage: React.FC<UILibPageProps> = ({ className }) => {
  const buttons = (
    <div className={cn(s.root, className)}>
      <h1>Buttons</h1>
      <div className={s.block}>
        <h2>variant</h2>
        <div className={s.col}>
          <h3>regular(default)</h3>
          <Button className={s.button} size="custom">
            custom
          </Button>
          <Button className={s.button} size="xs">
            xs size
          </Button>
          <Button className={s.button} size="sm">
            sm size
          </Button>
          <Button className={s.button} size="md">
            md size
          </Button>
          <Button className={s.button} size="lg">
            lg size
          </Button>
          <Button className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>outline</h3>
          <Button variant="outline" className={s.button} size="custom">
            custom
          </Button>
          <Button variant="outline" className={s.button} size="xs">
            xs size
          </Button>
          <Button variant="outline" className={s.button} size="sm">
            sm size
          </Button>
          <Button variant="outline" className={s.button} size="md">
            md size
          </Button>
          <Button variant="outline" className={s.button} size="lg">
            lg size
          </Button>
          <Button variant="outline" className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>monochrome</h3>
          <Button variant="monochrome" className={s.button} size="custom">
            custom
          </Button>
          <Button variant="monochrome" className={s.button} size="xs">
            xs size
          </Button>
          <Button variant="monochrome" className={s.button} size="sm">
            sm size
          </Button>
          <Button variant="monochrome" className={s.button} size="md">
            md size
          </Button>
          <Button variant="monochrome" className={s.button} size="lg">
            lg size
          </Button>
          <Button variant="monochrome" className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>clear</h3>
          <Button variant="clear" className={s.button} size="custom">
            custom
          </Button>
          <Button variant="clear" className={s.button} size="xs">
            xs size
          </Button>
          <Button variant="clear" className={s.button} size="sm">
            sm size
          </Button>
          <Button variant="clear" className={s.button} size="md">
            md size
          </Button>
          <Button variant="clear" className={s.button} size="lg">
            lg size
          </Button>
          <Button variant="clear" className={s.button} size="xl">
            xl size
          </Button>
        </div>
      </div>
      <hr />
      <div className={s.block}>
        <h2>danger</h2>
        <div className={s.col}>
          <h3>regular(default)</h3>
          <Button danger className={s.button} size="custom">
            custom
          </Button>
          <Button danger className={s.button} size="xs">
            xs size
          </Button>
          <Button danger className={s.button} size="sm">
            sm size
          </Button>
          <Button danger className={s.button} size="md">
            md size
          </Button>
          <Button danger className={s.button} size="lg">
            lg size
          </Button>
          <Button danger className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>outline</h3>
          <Button danger variant="outline" className={s.button} size="custom">
            custom
          </Button>
          <Button danger variant="outline" className={s.button} size="xs">
            xs size
          </Button>
          <Button danger variant="outline" className={s.button} size="sm">
            sm size
          </Button>
          <Button danger variant="outline" className={s.button} size="md">
            md size
          </Button>
          <Button danger variant="outline" className={s.button} size="lg">
            lg size
          </Button>
          <Button danger variant="outline" className={s.button} size="xl">
            xl size
          </Button>
        </div>
      </div>
      <hr />
      <div className={s.block}>
        <h2>With icon</h2>
        <div className={s.col}>
          <h3>regular(default)</h3>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>outline</h3>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="outline"
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>monochrome</h3>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="monochrome"
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>clear</h3>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            variant="clear"
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>regular(default)</h3>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <h3>outline</h3>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            leftElement={<Icon name="home" />}
            danger
            variant="outline"
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
      </div>
      <hr />
      <div className={s.block}>
        <h2>disabled</h2>
        <div className={s.col}>
          <Button disabled className={s.button} size="custom">
            custom
          </Button>
          <Button disabled className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled className={s.button} size="md">
            md size
          </Button>
          <Button disabled className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button disabled variant="outline" className={s.button} size="custom">
            custom
          </Button>
          <Button disabled variant="outline" className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled variant="outline" className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled variant="outline" className={s.button} size="md">
            md size
          </Button>
          <Button disabled variant="outline" className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled variant="outline" className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button
            disabled
            variant="monochrome"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button disabled variant="monochrome" className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled variant="monochrome" className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled variant="monochrome" className={s.button} size="md">
            md size
          </Button>
          <Button disabled variant="monochrome" className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled variant="monochrome" className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button disabled variant="clear" className={s.button} size="custom">
            custom
          </Button>
          <Button disabled variant="clear" className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled variant="clear" className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled variant="clear" className={s.button} size="md">
            md size
          </Button>
          <Button disabled variant="clear" className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled variant="clear" className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button disabled danger className={s.button} size="custom">
            custom
          </Button>
          <Button disabled danger className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled danger className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled danger className={s.button} size="md">
            md size
          </Button>
          <Button disabled danger className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled danger className={s.button} size="xl">
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="custom"
          >
            custom
          </Button>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="xs"
          >
            xs size
          </Button>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="sm"
          >
            sm size
          </Button>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="md"
          >
            md size
          </Button>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="lg"
          >
            lg size
          </Button>
          <Button
            disabled
            danger
            variant="outline"
            className={s.button}
            size="xl"
          >
            xl size
          </Button>
        </div>
        <div className={s.col}>
          <Button disabled variant="clear" className={s.button} size="custom">
            custom
          </Button>
          <Button disabled variant="clear" className={s.button} size="xs">
            xs size
          </Button>
          <Button disabled variant="clear" className={s.button} size="sm">
            sm size
          </Button>
          <Button disabled variant="clear" className={s.button} size="md">
            md size
          </Button>
          <Button disabled variant="clear" className={s.button} size="lg">
            lg size
          </Button>
          <Button disabled variant="clear" className={s.button} size="xl">
            xl size
          </Button>
        </div>
      </div>
      <hr />
      <h1>Icon Buttons</h1>
      <div className={s.block}>
        <h2>variant</h2>
        <div className={s.col}>
          <h3>regular(default)</h3>
          <IconButton icon="home" className={s.button} size="xs" />
          <IconButton icon="home" className={s.button} size="sm" />
          <IconButton icon="home" className={s.button} size="md" />
          <IconButton icon="home" className={s.button} size="lg" />
          <IconButton icon="home" className={s.button} size="xl" />
        </div>
        <div className={s.col}>
          <h3>outline</h3>
          <IconButton
            icon="home"
            variant="outline"
            className={s.button}
            size="xs"
          />
          <IconButton
            icon="home"
            variant="outline"
            className={s.button}
            size="sm"
          />
          <IconButton
            icon="home"
            variant="outline"
            className={s.button}
            size="md"
          />
          <IconButton
            icon="home"
            variant="outline"
            className={s.button}
            size="lg"
          />
          <IconButton
            icon="home"
            variant="outline"
            className={s.button}
            size="xl"
          />
        </div>
        <div className={s.col}>
          <h3>monochrome</h3>
          <IconButton
            icon="home"
            variant="monochrome"
            className={s.button}
            size="xs"
          />
          <IconButton
            icon="home"
            variant="monochrome"
            className={s.button}
            size="sm"
          />
          <IconButton
            icon="home"
            variant="monochrome"
            className={s.button}
            size="md"
          />
          <IconButton
            icon="home"
            variant="monochrome"
            className={s.button}
            size="lg"
          />
          <IconButton
            icon="home"
            variant="monochrome"
            className={s.button}
            size="xl"
          />
        </div>
        <div className={s.col}>
          <h3>regular / danger</h3>
          <IconButton icon="home" danger className={s.button} size="xs" />
          <IconButton icon="home" danger className={s.button} size="sm" />
          <IconButton icon="home" danger className={s.button} size="md" />
          <IconButton icon="home" danger className={s.button} size="lg" />
          <IconButton icon="home" danger className={s.button} size="xl" />
        </div>
        <div className={s.col}>
          <h3>outline / danger</h3>
          <IconButton
            variant="outline"
            icon="home"
            danger
            className={s.button}
            size="xs"
          />
          <IconButton
            variant="outline"
            icon="home"
            danger
            className={s.button}
            size="sm"
          />
          <IconButton
            variant="outline"
            icon="home"
            danger
            className={s.button}
            size="md"
          />
          <IconButton
            variant="outline"
            icon="home"
            danger
            className={s.button}
            size="lg"
          />
          <IconButton
            variant="outline"
            icon="home"
            danger
            className={s.button}
            size="xl"
          />
        </div>
        <div className={s.col}>
          <h3>clear</h3>
          <IconButton
            variant="clear"
            icon="home"
            className={s.button}
            size="xs"
          />
          <IconButton
            variant="clear"
            icon="home"
            className={s.button}
            size="sm"
          />
          <IconButton
            variant="clear"
            icon="home"
            className={s.button}
            size="md"
          />
          <IconButton
            variant="clear"
            icon="home"
            className={s.button}
            size="lg"
          />
          <IconButton
            variant="clear"
            icon="home"
            className={s.button}
            size="xl"
          />
        </div>
      </div>
    </div>
  );

  const tags = (
    <div className={cn(s.root, className)}>
      <h1>Tags</h1>
      <div className={s.block}>
        <h2>primary</h2>
        <div className={s.col}>
          <h3>grape(default)</h3>
          <TagButton className={s.button}>tag button</TagButton>
          <TagButton className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton className={s.button} uppercase tail="42" icon="home">
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <h3>gold</h3>
          <TagButton color="gold" className={s.button}>
            tag button
          </TagButton>
          <TagButton color="gold" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton color="gold" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            color="gold"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <h3>silver</h3>
          <TagButton color="silver" className={s.button}>
            tag button
          </TagButton>
          <TagButton color="silver" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton color="silver" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            color="silver"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <h3>green</h3>
          <TagButton color="green" className={s.button}>
            tag button
          </TagButton>
          <TagButton color="green" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton color="green" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            color="green"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <h3>red</h3>
          <TagButton color="red" className={s.button}>
            tag button
          </TagButton>
          <TagButton color="red" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton color="red" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            color="red"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
      </div>
      <div className={s.block}>
        <h2>active</h2>
        <div className={s.col}>
          <TagButton active className={s.button}>
            tag button
          </TagButton>
          <TagButton active className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton active className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            active
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton active color="gold" className={s.button}>
            tag button
          </TagButton>
          <TagButton active color="gold" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            active
            color="gold"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            active
            color="gold"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton active color="silver" className={s.button}>
            tag button
          </TagButton>
          <TagButton active color="silver" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            active
            color="silver"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            active
            color="silver"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton active color="green" className={s.button}>
            tag button
          </TagButton>
          <TagButton active color="green" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            active
            color="green"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            active
            color="green"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton active color="red" className={s.button}>
            tag button
          </TagButton>
          <TagButton active color="red" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            active
            color="red"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            active
            color="red"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
      </div>
      <div className={s.block}>
        <h2>badge</h2>
        <div className={s.col}>
          <TagButton badge className={s.button}>
            tag button
          </TagButton>
          <TagButton badge className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton badge className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton badge className={s.button} uppercase tail="42" icon="home">
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton badge color="gold" className={s.button}>
            tag button
          </TagButton>
          <TagButton badge color="gold" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            badge
            color="gold"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            badge
            color="gold"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton badge color="silver" className={s.button}>
            tag button
          </TagButton>
          <TagButton badge color="silver" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            badge
            color="silver"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            badge
            color="silver"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton badge color="green" className={s.button}>
            tag button
          </TagButton>
          <TagButton badge color="green" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            badge
            color="green"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            badge
            color="green"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton badge color="red" className={s.button}>
            tag button
          </TagButton>
          <TagButton badge color="red" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton badge color="red" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            badge
            color="red"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
      </div>

      <div className={s.block}>
        <h2>small</h2>
        <div className={s.col}>
          <TagButton size="sm" className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton size="sm" className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            size="sm"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" color="gold" className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" color="gold" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            color="gold"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            color="gold"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" color="silver" className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" color="silver" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            color="silver"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            color="silver"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" color="green" className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" color="green" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            color="green"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            color="green"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" color="red" className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" color="red" className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            color="red"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            color="red"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.col}>
          <TagButton size="sm" active className={s.button}>
            tag button
          </TagButton>
          <TagButton size="sm" active className={s.button} uppercase>
            uppercase
          </TagButton>
          <TagButton size="sm" active className={s.button} uppercase tail="42">
            with tail
          </TagButton>
          <TagButton
            size="sm"
            active
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" active color="gold" className={s.button}>
            tag button
          </TagButton>
          <TagButton
            size="sm"
            active
            color="gold"
            className={s.button}
            uppercase
          >
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            active
            color="gold"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            active
            color="gold"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" active color="silver" className={s.button}>
            tag button
          </TagButton>
          <TagButton
            size="sm"
            active
            color="silver"
            className={s.button}
            uppercase
          >
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            active
            color="silver"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            active
            color="silver"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" active color="green" className={s.button}>
            tag button
          </TagButton>
          <TagButton
            size="sm"
            active
            color="green"
            className={s.button}
            uppercase
          >
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            active
            color="green"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            active
            color="green"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
        <div className={s.col}>
          <TagButton size="sm" active color="red" className={s.button}>
            tag button
          </TagButton>
          <TagButton
            size="sm"
            active
            color="red"
            className={s.button}
            uppercase
          >
            uppercase
          </TagButton>
          <TagButton
            size="sm"
            active
            color="red"
            className={s.button}
            uppercase
            tail="42"
          >
            with tail
          </TagButton>
          <TagButton
            size="sm"
            active
            color="red"
            className={s.button}
            uppercase
            tail="42"
            icon="home"
          >
            with tail
          </TagButton>
        </div>
      </div>
    </div>
  );

  const buttonGroups = (
    <div className={cn(s.root, className)}>
      <h1>Button Groups</h1>
      <div className={s.block}>
        <div className={s.button}>
          <ButtonGroup
            size="xl"
            uppercase
            buttons={[
              { text: 'yes', label: { text: '75%', color: 'green' } },
              { text: 'no', label: { text: '25%', color: 'red' } },
            ]}
          />
        </div>
        <div className={s.button}>
          <ButtonGroup
            size="lg"
            uppercase
            buttons={[
              { text: 'yes', label: { text: '75%', color: 'green' } },
              { text: 'no', label: { text: '25%', color: 'red' } },
            ]}
          />
        </div>
        <div className={s.button}>
          <ButtonGroup
            size="md"
            uppercase
            buttons={[
              { text: 'yes', label: { text: '75%', color: 'green' } },
              { text: 'no', label: { text: '25%', color: 'red' } },
            ]}
          />
        </div>
        <div className={s.button}>
          <ButtonGroup
            size="sm"
            inactive
            uppercase
            buttons={[
              { text: 'yes', label: { text: '75%', color: 'green' } },
              { text: 'no', label: { text: '25%', color: 'red' } },
            ]}
          />
        </div>
        <div className={s.button}>
          <ButtonGroup
            size="xs"
            disabled
            uppercase
            buttons={[
              { text: 'yes', label: { text: '75%', color: 'green' } },
              { text: 'no', label: { text: '25%', color: 'red' } },
            ]}
          />
        </div>
      </div>
    </div>
  );

  const switcher = (
    <div className={cn(s.root, className)}>
      <h1>Switcher</h1>
      <div className={s.block}>
        <Switcher options={['data 1', 'data 2']} />
      </div>
    </div>
  );

  const labelButtons = (
    <div className={cn(s.root, className)}>
      <h1>LabelButton</h1>
      <div className={s.block}>
        <LabelButton className={s.button}>MAX</LabelButton>
        <LabelButton className={s.button} disabled>
          MAX
        </LabelButton>
      </div>
    </div>
  );

  const [text, setText] = useState('');

  const textField = (
    <div className={cn(s.root, className)}>
      <h1>TextField</h1>
      <div className={s.col}>
        <TextField
          label="Label"
          name="textfield"
          value={text}
          onChange={setText}
          variant="lg"
        />
      </div>
      <div className={s.col}>
        <TextField
          label="Label"
          name="textfield"
          value={text}
          onChange={setText}
          variant="md"
        />
      </div>
      <div className={s.col}>
        <TextField
          label="Label"
          name="textfield"
          value={text}
          onChange={setText}
          variant="sm"
          helperText="helper text"
        />
      </div>
      <div className={s.col}>
        <TextField
          label="Label"
          name="textfield"
          value={text}
          onChange={setText}
          variant="xs"
          error="Error text"
        />
      </div>
    </div>
  );

  const noties = (
    <div className={cn(s.root, className)}>
      <h1>Notifications</h1>
      <div className={s.block}>
        <div className={s.button}>
          <Button onClick={() => showNotification(notifications[0])}>
            Info, 3000ms
          </Button>
        </div>
        <div className={s.button}>
          <Button onClick={() => showNotification(notifications[1])}>
            Success
          </Button>
        </div>
        <div className={s.button}>
          <Button onClick={() => showNotification(notifications[2])}>
            Error
          </Button>
        </div>
        <div className={s.button}>
          <Button onClick={() => showNotification(notifications[3])}>
            Warning
          </Button>
        </div>
      </div>
    </div>
  );

  const [selectedItem, handleSelectedItem] = useState('1');

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleSelectedItem(event.target.value);

  const radioButtons = (
    <div className={cn(s.root, className)}>
      <h1>Radio buttons</h1>
      <div className={s.block}>
        <div className={s.col}>
          <div className={s.button}>
            <RadioButton
              name="test1"
              value="1"
              onChange={radioChange}
              checked={selectedItem === '1'}
            />
          </div>
          <div className={s.button}>
            <RadioButton
              name="test1"
              value="2"
              onChange={radioChange}
              checked={selectedItem === '2'}
            />
          </div>
          <div className={s.button}>
            <RadioButton
              name="test1"
              value="3"
              onChange={radioChange}
              checked={selectedItem === '3'}
            />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.button}>
            <RadioButton name="test1" value="4" disabled checked />
          </div>
          <div className={s.button}>
            <RadioButton name="test1" value="5" disabled />
          </div>
        </div>
      </div>
    </div>
  );

  const [checked, handleChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChecked(event.target.checked);
  };

  const checkboxes = (
    <div className={cn(s.root, className)}>
      <h1>Checkboxes</h1>
      <div className={s.block}>
        <div className={s.col}>
          <Checkbox onChange={handleCheckboxChange} checked={checked} />
        </div>
        <div className={s.col}>
          <Checkbox disabled />
        </div>
        <div className={s.col}>
          <Checkbox disabled checked />
        </div>
      </div>
    </div>
  );

  const [completeSpinner, setCompleteSpinner] = useState(false);

  const spinner = (
    <div className={cn(s.root, className)}>
      <h1>Spinner</h1>
      <div className={s.col}>
        <Spinner complete={completeSpinner} />
      </div>
      <div className={s.col}>
        <Button
          onClick={() => {
            setCompleteSpinner(!completeSpinner);
          }}
        >
          ToggleSpinner
        </Button>
      </div>
    </div>
  );

  const [showModal, hideModal] = useModal(() => (
    <Modal>
      <p>Modal component here</p>
      <Button
        onClick={() => {
          hideModal();
        }}
      >
        close
      </Button>
    </Modal>
  ));

  const modal = (
    <div className={cn(s.root, className)}>
      <h1>Modal</h1>
      <Button
        onClick={() => {
          showModal();
        }}
      >
        Open Modal
      </Button>
    </div>
  );

  const iconsList = (
    <div className={cn(s.root, className)}>
      <h1>Icons</h1>
      <table className={s.iconTable}>
        <tbody>
          {Object.keys(icons).map((name) => {
            const iconName = name as IconNamesType;

            return (
              <tr key={name}>
                <td>{iconName}</td>
                <td>
                  <Icon name={iconName} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const [breadcrumbsElements, setBreadcrumbsElements] = useState([
    { name: 'WETH', url: '' },
  ]);

  function addBreadcrumbElement(elementName: string, elementUrl = '') {
    setBreadcrumbsElements([
      ...breadcrumbsElements,
      { name: elementName, url: elementUrl },
    ]);
  }

  function removeBreadcrumbElement() {
    if (breadcrumbsElements.length > 1) {
      setBreadcrumbsElements(breadcrumbsElements.slice(0, -1));
    }
  }

  const breadcrumbs = (
    <div className={cn(s.root, className)}>
      <h1>Breadcrumbs</h1>
      <div className={s.block}>
        <div className={s.col}>
          <Button onClick={() => addBreadcrumbElement('TEST')}>
            <p>Add strategy</p>
          </Button>
        </div>
        <div className={s.col}>
          <Button onClick={() => addBreadcrumbElement('TEST', '/test')}>
            <p>Add navigable element</p>
          </Button>
        </div>
        <div className={s.col}>
          <Button onClick={removeBreadcrumbElement}>
            <p>Remove last element</p>
          </Button>
        </div>
        <div className={s.button}>
          <br />
          <div className={s.button}>
            <Breadcrumbs element={breadcrumbsElements} />
          </div>
          <div className={s.button}>
            <Breadcrumbs element={breadcrumbsElements} size="md" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {buttons}
      {tags}
      {switcher}
      {buttonGroups}
      {labelButtons}
      {textField}
      {noties}
      {radioButtons}
      {checkboxes}
      {spinner}
      {iconsList}
      {modal}
      {breadcrumbs}
    </>
  );
};

export default UILibPage;
